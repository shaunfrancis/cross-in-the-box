import { Context, createContext, Fragment, useContext, useEffect, useRef, useState } from "react";

import styles from 'src/components/shared/ElectionResultContainer/ElectionResultContainer.module.css';
import ElectionResultContainer from "../../../../shared/ElectionResultContainer/ElectionResultContainer";
import HoverPopup from "../../../../shared/HoverPopup/HoverPopup";
import PopupBarGraph from "../../../../shared/PopupBarGraph/PopupBarGraph";
import { Party, Region, Result, ResultsContext, Update } from "src/Types";
import { DefaultParty, Endpoint } from "src/constants/shared";
import { useRouter } from "next/navigation";
import { constituencyToSlug } from "src/lib/UK";
import { getMessages, getResultsBySubElection, parseJSONWithDates, useOnScreen } from "src/lib/shared";
import USASenate1960Map from "src/components/maps/USASenate1960Map";
import USASenate1960GeographicMap from "src/components/maps/USASenate1960GeographicMap";
import ElectionSummaryBars from "src/components/shared/ElectionSummaries/ElectionSummaryBars/ElectionSummaryBars";
import { electionType, getSenatePreviousSpecialOverrides, senateCaucusMap, subidLabels, USASeatsToWatch } from "src/constants/USA";
import LiveCloseAndCountedData from "src/components/USA/shared/LiveCloseAndCountedData/LiveCloseAndCountedData";
import { regionUrlFun, timeFun } from "src/lib/USA";


export default function SenateResultContainer( 
    { 
        context = createContext<ResultsContext>({ bank: [], promises: [] }),
        election,
        classNo, 
        live = false,
        title = [election.replace(/[^0-9.]/g, ''), "Senate", "Elections"],
        regions,
        parties,
        messageGroup,
        messagesOpenOnLoad,
        geographic,
        changes,
        dedicatedPage,
        winFormula = (results : Result[]) => results.filter(r => r.elected),
        liveCloseAndCountedData = []
    } : 
    { 
        context? : Context<ResultsContext>,
        election : string, 
        classNo : 1 | 2 | 3,
        live? : boolean,
        title? : string[],
        regions : Region[],
        parties : Party[],
        winFormula? : (results : Result[]) => Result[],
        messageGroup? : string,
        messagesOpenOnLoad?: boolean,
        geographic? : boolean,
        changes? : boolean,
        dedicatedPage? : string,
        liveCloseAndCountedData? : { id : string, close : Date, counted? : number }[]
    }
){

    const dimensions = {w:"calc( 1.3 * (100vh - 100px) )", h:"calc(100vh - 100px)", minW:live ? "525px" : "425px", minH:"500px"};
    const router = useRouter();
    const container = useRef<HTMLDivElement>(null);
    const onScreen = useOnScreen(container);
    const loadingComplete = useRef<boolean>(false);
    
    const { bank: resultsBank, promises: resultsPromises } = useContext(context)!;
    let [fills, setFills] = useState<{id: string, color: string, opacity?: number}[]>([]);
    let [popupState, setPopupState] = useState<{visible: boolean, coordinates:[number,number], id?: string}>( { visible: false, coordinates:[0,0] } );

    let [results, setResults] = useState<Result[]>([]);
    let [updates, setUpdates] = useState<Update[]>([]);
    let [otherClassResults, setOtherClassResults] = useState<Result[]>([]);

    let [messages, setMessages] = useState<{id: number, date: Date, node: React.ReactNode}[]>([]);
    let latestMessageDate = useRef<Date>(new Date(0));

    let [livePolling, setLivePolling] = useState<boolean>(false);
    let [liveCounter, setLiveCounter] = useState<number>(0);

    const getSpecials = (results : Result[]) : any => {
        return results
            .filter( result => !result.id.includes( classNo.toString() ) )
            .map( result => result.id )
            .filter( (id, index, ids) => ids.indexOf(id) === index );
    };

    useEffect( () => {
        if( loadingComplete.current || !onScreen || parties.length == 0 || regions.length == 0) return;
        loadingComplete.current = true;

        const getResultsFromElection = async (election : string) => {
            const contextResults = () => resultsBank.find( r => r.election === election );
            if(contextResults()) return contextResults()!.results;
            else{
                let resultData : Result[];

                if(resultsPromises.find( p => p.election === election )){
                    resultData = await resultsPromises.find( p => p.election === election)!.promise;
                }
                else{
                    const promise : Promise<Result[]> = new Promise( async resolve => {
                        const data = await fetch(Endpoint + '/results/usa/' + election).then( res => res.json() );

                        let electionData = await fetch(Endpoint + '/elections/usa/' + election)
                            .then( res => res.text() )
                            .then( text => parseJSONWithDates(text, "date") );

                        resultsBank.push({
                            election: election,
                            date: electionData!.date,
                            results: data,
                        });

                        resolve(data);
                    });

                    resultsPromises.push({
                        election: election,
                        promise: promise
                    });
                    resultData = await promise;
                }

                return resultData;
            }
        };
        
        const getResults = async () => {
            let updateData : Update[] = [];
            if(changes){
                updateData = await fetch(Endpoint + "/updates/usa/" + election)
                    .then( res => res.text() )
                    .then( res => parseJSONWithDates(res, "date") );
                    
                updateData.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
                setUpdates(updateData);
            }

            //get results from current election
            const resultData = await getResultsFromElection(election);
            setResults(resultData);

            const newFills : {id: string, color: string, opacity?: number}[] = [];

            //get results from the most recent election for the other two class numbers
            //for ghost fills
            const electionYear = parseInt(election.slice(1));
            if(electionYear){
                const newOtherClassResults = [
                    ...getSenatePreviousSpecialOverrides(electionYear-2),
                    ...await getResultsFromElection("S" + (electionYear-2)), 
                    ...getSenatePreviousSpecialOverrides(electionYear-4),
                    ...await getResultsFromElection("S" + (electionYear-4))
                ];

                winFormula(newOtherClassResults).forEach( result => {
                    if(resultData.find( r => r.id === result.id )) return;
                    const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
                    if(party) newFills.push({ 
                        id: result.id, 
                        color: party.color || "var(--default-color)", 
                        opacity: 1 / 3
                    });
                });
                setOtherClassResults(newOtherClassResults);
            }

            let updatedLiveCount = 0;
            winFormula(resultData).forEach( result => {
                updatedLiveCount++;
                const regionUpdates = updateData.filter( u => u.id == result.id );
                if(regionUpdates.length > 0){
                    const latestUpdate = regionUpdates[regionUpdates.length - 1];
                    const party : Party = parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
                    if(party) newFills.push({ id: latestUpdate.id, color: party.color || "var(--default-color)" });
                }
                else{
                    const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
                    if(party) newFills.push({ 
                        id: result.id, 
                        color: party.color || "var(--default-color)", 
                        opacity: changes ? 0.2 : undefined 
                    });
                }
            });
            setLiveCounter(updatedLiveCount);
            setFills(newFills);

            if(messageGroup){
                const newMessages = await getMessages(parties, latestMessageDate, '/messages/usa/' + messageGroup, regionUrlFun, timeFun);
                setMessages(newMessages);
            }
        };
        getResults();
    }, [onScreen, parties, regions]);

    if(live) setTimeout( () => {
        setLivePolling(!livePolling); //alternate value to trigger useEffect
    }, 6000);
    useEffect( () => {
        if(!(loadingComplete.current && live)) return;

        //get results from the most recent election for the other two class numbers
        //for ghost fills
        const ghostFills : { id : string, color : string, opacity? : number }[] = [];
        winFormula(otherClassResults).forEach( result => {
            if(results.find( r => r.id === result.id )) return;
            const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
            if(party) ghostFills.push({ 
                id: result.id, 
                color: party.color || "var(--default-color)", 
                opacity: 1 / 3
            });
        });

        const getLiveUpdates = async () => {
            let updatedResultData = await fetch(Endpoint + '/results/usa/' + election + '?compact=true').then( res => res.json() );

            let newResultData : Result[] = [];

            const repeatedPartyMap = new Map<string, number>();
            results.forEach( result => {
                const updatedRows = updatedResultData.filter( d => d.id == result.id && d.p == result.party );
                //handle the case that, for example, there are multiple ind candidates in the same contest
                if(updatedRows.length > 1){
                    let n = repeatedPartyMap.get(JSON.stringify(updatedRows)) || 0;
                    repeatedPartyMap.set(JSON.stringify(updatedRows), n + 1);
                    n = Math.min(n, updatedRows.length - 1);
                    newResultData.push({...result, votes: updatedRows[n].v, elected: updatedRows[n].e});
                }
                else if(updatedRows.length == 1) newResultData.push({...result, votes: updatedRows[0].v, elected: updatedRows[0].e});
                else newResultData.push(result);
            });
            setResults(newResultData);
            
            const newFills : {id: string, color: string, opacity?: number}[] = [];
            let updatedLiveCount = 0;
            winFormula(newResultData).forEach( result => {
                updatedLiveCount++;
                const party : Party = parties.find( p => p.id == result.party ) || DefaultParty;
                if(party) newFills.push({ 
                    id: result.id, 
                    color: party.color || "var(--default-color)", 
                    opacity: changes ? 0.2 : undefined 
                });
            });
            setFills([...newFills, ...ghostFills]);
            setLiveCounter(updatedLiveCount);

            if(messageGroup){
                const since = new Date(latestMessageDate.current.valueOf());
                since.setHours(since.getHours() - (new Date()).getTimezoneOffset()/60);
                const newMessages = await getMessages(
                    parties,
                    latestMessageDate,
                    '/messages/usa/' + messageGroup + '?since=' + since.toISOString(),
                    regionUrlFun,
                    timeFun,
                    messages
                );
                setMessages(newMessages);
            }
        };
        getLiveUpdates();
    }, [livePolling]);

    const mapHoverFun = (active : boolean = false, event?: React.MouseEvent, id?: string) => {
        const newPopupState = {...popupState, visible: active};
        if(event) newPopupState.coordinates = [event.clientX, event.clientY];
        if(id) newPopupState.id = id;
        setPopupState(newPopupState);
    };

    const mapClickFun = (id: string) => {
        const region = regions.find( r => r.id == id );
        if(region) router.push('/usa/senate-elections/state/' + constituencyToSlug(region.title));
    };
    const geographicMapClickFun = (classlessId: string) => {
        const region = regions.find( r => r.id == classlessId + classNo );
        if(region) router.push('/usa/senate-elections/state/' + constituencyToSlug(region.title));
    };

    const map = () => {
        if(geographic){
            const noResultYetFills : {id : string, color : string}[] = [];
            regions.forEach( region => {
                const regionResults = results.filter( result => result.id == region.id );
                if(regionResults.length == 0) return;
                const wasElected = regionResults.find( result => result.elected );
                if(!wasElected){ //if no winner but candidates exist then must be live
                    const color = USASeatsToWatch.find( s => s.id == region.id) ? "url(#highlight_no_result)" : "url(#no_result)";
                    noResultYetFills.push({ id: region.id, color: color });
                }
            });
            return <USASenate1960GeographicMap regions={regions} hoverFun={mapHoverFun} clickFun={geographicMapClickFun} fills={[...fills.filter(f => !f.opacity), ...noResultYetFills]} />;
        }
        else return <USASenate1960Map classNo={classNo} specialNames={getSpecials(results)} regions={regions} hoverFun={mapHoverFun} clickFun={mapClickFun} fills={fills} />;
    };

    const popupContent = (id? : string) => geographic ? geographicPopupContent(id) : cartographicPopupContent(id);

    const cartographicPopupContent = (id? : string) => {
        const region = regions.find( region => region.id == id );
        if(!region || !id) return <h3>Missing data</h3>;

        const regionResults = results.filter( result => result.id == id ).sort( (a,b) => b.votes - a.votes );
        if(regionResults.length > 0){ //current year election
        
            const winner = winFormula(regionResults)[0]?.candidate;

            const subElections = getResultsBySubElection(regionResults);
            const resultNodes : React.ReactNode[] = [];

            if(electionType(id) == "rounds" && subElections.length >= 1) resultNodes.push(
                <PopupBarGraph 
                    key={subElections[0].subid}
                    results={subElections[0].results}
                    parties={parties}
                />
            );
            else{
                subElections.forEach( subElection => {
                    resultNodes.push(
                        <PopupBarGraph 
                            key={subElection.subid} 
                            title={subElections.length > 1 ? subidLabels(id, subElection.subid) : undefined} 
                            results={subElection.results}
                            parties={parties}
                        />
                    );
                });
            }

            const watchNote = election == "S2024" && USASeatsToWatch.find(s => s.id == id)?.note;
            return ( <>
                <h3>{region.title}</h3>
                {winner ? <h4>{winner}</h4> : <div style={{maxWidth: "350px"}}>{watchNote}</div>}
                {<LiveCloseAndCountedData id={region.id} data={liveCloseAndCountedData} />}
                {resultNodes}
            </> )

        }
        else{ //test if previous year election with different class
            const winner = winFormula( otherClassResults.filter( result => result.id == id ) )[0];
            const party = parties.find(p => p.id == winner?.party) || DefaultParty;
            const year = resultsBank.find( r => r.results.includes(winner) )?.date;

            if(winner) return ( <>
                <h3>{region.title}</h3>
                <h4>{winner.candidate}</h4>
                <div className={styles["flex-row"]}>
                    <div className={styles["bloc"]} style={{background:party.color, color:party.textColor}}>{party.displayId}</div>
                    <span>elected {year ? "in " + year.getFullYear() : "previously"}</span>
                </div>
            </> );
            else return (<h3>Missing data</h3>);
        }
    };

    const geographicPopupContent = (id? : string) => {
        if(!id) return (<h3>Missing data</h3>);

        const nodes : React.ReactNode[] = [];
        new Set([classNo, 1, 2, 3]).forEach( specificClass => {
            const region = regions.find( region => region.id == id + specificClass);
            if(!region) return;

            const regionResults = results.filter( result => result.id == id + specificClass ).sort( (a,b) => b.votes - a.votes );
            if(regionResults.length == 0) return;

            nodes.push(
                <div key={specificClass} style={nodes.length > 0 ? {marginTop: "20px"} : undefined}>
                    {cartographicPopupContent(id + specificClass)}
                </div>
            );

        });

        if(nodes.length == 0){
            const region = regions.find( region => [id + "1", id + "2", id + "3"].includes(region.id));
            if(!region) return (<h3>Missing data</h3>);
            return (<>
                <h3>{region.title.split(" (Class")[0]}</h3>
                <h4>No election this year</h4>
            </>);
        }

        return nodes;
    }

    const electionSummaryBars = () => {
        const summaries : {party : Party, count : number, ghostCount : number}[] = [];
        const countedResults : string[] = [];

        const caucusedIndCounts = new Map<string, {party : Party, count : number, ghostCount : number}>();

        winFormula([...results, ...otherClassResults]).forEach( (result, index) => {
            if(countedResults.includes(result.id)) return;
            else if(otherClassResults.includes(result) && results.find(r => r.id == result.id)) return;
            countedResults.push(result.id);

            const regionUpdates = updates.filter( u => u.id == result.id );
            const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;
            const shouldIncrementCount = +(index < winFormula(results).length);

            const resultElection = results.includes(result) ? election : resultsBank.find( r => r.results.includes(result) )?.election;
            const caucusesWithParty = senateCaucusMap.find(c => c.election === resultElection && c.region === result.id)?.caucusesWith;
            if(caucusesWithParty){

                const mapData = caucusedIndCounts.get(caucusesWithParty) || {
                    party: parties.find( p => p.id == winner ) || DefaultParty,
                    count: 0,
                    ghostCount: 0
                };
                caucusedIndCounts.set(caucusesWithParty, {
                    party: mapData.party,
                    count: mapData.count + shouldIncrementCount,
                    ghostCount: mapData.ghostCount + 1 - shouldIncrementCount
                });
                return;

            }

            if(!summaries.find( s => s.party.id == result.party)){
                const party : Party = parties.find( p => p.id == winner ) || DefaultParty;
                summaries.push({ party: party, count: shouldIncrementCount, ghostCount: 1 - shouldIncrementCount });
            }
            else{
                summaries.find( s => s.party.id == winner )!.count += shouldIncrementCount;
                summaries.find( s => s.party.id == winner )!.ghostCount += 1 - shouldIncrementCount;
            }
        });
        summaries.sort( (a,b) => {
            return b.count - a.count || a.party.id.localeCompare(b.party.id);
        } );

        const comboFunction = (data : {party : Party, count : number, ghostCount : number}[]) => {
            const comboBars : {party : Party, count : number, ghostCount : number}[][] = [];

            data.forEach( row => {
                const rows : {party : Party, count : number, ghostCount : number}[] = [row];
                const mapData = caucusedIndCounts.get(row.party.id);
                if(mapData) rows.push(mapData);
                comboBars.push(rows);
            } );

            comboBars.sort( (x,y) => {
                return y.reduce((a,r) => a + r.count + (r.ghostCount || 0), 0) - x.reduce((a,r) => a + r.count + (r.ghostCount || 0), 0);
            });

            return comboBars;
        };

        return (
            <ElectionSummaryBars data={summaries} comboFunction={comboFunction} total={100} />
        );
    }

    return ( <>
        <ElectionResultContainer ref={container} 
            dimensions={dimensions} 
            messages={messageGroup ? messages.map(m => m.node) : undefined} messagesOpenOnLoad={messagesOpenOnLoad} 
            map={map()} 
            title={title} 
            liveTitle={live ? [liveCounter.toString(),"of 34","Seats"] : undefined}
            summary={electionSummaryBars()}
            dedicatedPage={dedicatedPage}
        >
            <HoverPopup visible={popupState.visible} coordinates={popupState.coordinates}>
                {popupContent(popupState.id)}
            </HoverPopup>
        </ElectionResultContainer>
    </> )
}