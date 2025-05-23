import { Party, Region, Result } from 'src/Types';
import UKElectionResultContainer from '../UKElectionResultsSection/UKElectionResultContainer/UKElectionResultContainer';
import styles from './UKAnalysisSection.module.css';
import { useEffect, useState } from 'react';
import { Endpoint } from 'src/constants/shared';
import UKTernaryPlot from './UKTernaryPlot/UKTernaryPlot';

export default function UKAnalysisSection( { regions, parties, geographic } : 
    { regions : Region[], parties : Party[], geographic: boolean }
){
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


            <section className={styles["graph-container"]}>
                <h1>How Seats Changed</h1>
                <p>Removing other parties and normalising the vote share of the Conservatives, Labour and Liberal Democrats, almost every constituency in England and Wales can be plotted, showing how these parties' vote shares changed from the previous election.</p>
                <UKTernaryPlot resultSets={[previousResults, currentResults]} parties={parties} />
            </section>

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