import { Party, Region, Result } from 'src/Types';
import UKElectionResultContainer from '../UKElectionResultsSection/UKElectionResultContainer/UKElectionResultContainer';
import styles from './UKAnalysisSection.module.css';
import Toggle from 'src/components/shared/Toggle/Toggle';
import { useEffect, useState } from 'react';
import { Endpoint } from 'src/Constants';
import UKTernaryPlot from './UKTernaryPlot/UKTernaryPlot';

export default function UKAnalysisSection( { regions, parties } : { regions : Region[], parties : Party[] }){
    const [geographic, setGeographic] = useState<boolean>(false);
    const [summaryBlocHover, setSummaryBlocHover] = useState<boolean>(false);

    let [currentResults, setCurrentResults] = useState<Result[]>([]);
    let [previousResults, setPreviousResults] = useState<Result[]>([]);
    useEffect( () => {
        const getResults = async () => {
            const currentResultData : Result[] = await fetch(Endpoint + '/results/uk/2019').then( res => res.json() );
            setCurrentResults(currentResultData);
            const previousResultData : Result[] = await fetch(Endpoint + '/results/uk/2017').then( res => res.json() );
            setPreviousResults(previousResultData);
        }
        getResults();
    }, []);
    
    return ( <>
        <Toggle 
            from={"/images/uk-cartographic-icon.svg"} 
            to={"/images/uk-geographic-icon.svg"} 
            fun={(state) => { setGeographic(state) }}
        />
        <div id={styles["container"]}>

            <UKElectionResultContainer election="2019" title={["2019","Result at","General Election"]} messageGroup="2019"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                preloadedResults={currentResults}
                geographic={geographic}
            />

            <UKElectionResultContainer election="2019" title={["2019","Changes Throughout","Course of Parliament"]} changes={true} messageGroup="2019U"
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]}
                regions={regions}
                parties={parties}
                preloadedResults={currentResults}
                geographic={geographic} />

            <UKTernaryPlot resultSets={[previousResults, currentResults]} parties={parties} />

            <UKElectionResultContainer election="2019" title={["2019","Result Excluding the Conservatives,","Labour, the DUP and Sinn Féin"]}
                summaryBlocHoverState={[summaryBlocHover, setSummaryBlocHover]} 
                regions={regions}
                parties={parties}
                preloadedResults={currentResults}
                geographic={geographic} 
                winFormula={(results : Result[]) => {
                    const ignoringMainTwo : Result[] = [];
                    new Set(results.map( r => r.id )).forEach( id => {
                        const regionResults = results.filter(r => r.id == id && !["con","lab","dup","sf"].includes(r.party));
                        regionResults.sort( (a,b) => b.votes - a.votes );
                        ignoringMainTwo.push(regionResults[0]);
                    });
                    return ignoringMainTwo;
                }}
            />
            
        </div>
    </> )
}