'use client';

import { Endpoint } from 'src/Constants';
import styles from './UKConstituencySearchSection.module.css';
import { SearchHandler } from 'src/lib/shared';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { constituencyToSlug, partyIdToDisplayId } from 'src/lib/UK';
import { Party } from 'src/Types';

interface SearchResults{
    regions : {id : string, title : string}[], 
    candidates : {
        id : string,
        title : string,
        candidate : string,
        election : string[],
        party : Party
    }[]
}

export default function UKConstituencySearchSection(){
    const [results, setResults] = useState<SearchResults | null>();
    const [currentQuery, setCurrentQuery] = useState<string>("");
    const router = useRouter();

    const handler = new SearchHandler(Endpoint + "/search/uk/");
    const search = async (query : string) => {
        const searchResults : SearchResults | null = await handler.search(query);
        setResults(searchResults ? searchResults : null);
        setCurrentQuery(searchResults ? query : "");
    }

    const highlightRelevance = (text : string) : React.ReactNode[] => {
        const words = currentQuery.split(" ");
        words.sort( (a,b) => b.length - a.length );
        
        let regexPattern = "(";
        words.forEach( (word, index) => {
            regexPattern += (index == 0 ? "" : "|") + word;
        })
        regexPattern += ")";

        const spans : React.ReactNode[] = [];
        text.split( new RegExp(regexPattern, "gi") ).forEach( (fragment, index) => {
            if(fragment != "") spans.push(
                <span key={index} style={ index % 2 ? {} : {color: "#666"} }>{fragment}</span>
            )
        });
        
        return spans;
    }

    return (
        <div id={styles["container"]}>
            <div id={styles["search-container"]}>
                <input type="text" id={styles["search-bar"]} spellCheck={false} onChange={(event) => { search(event.target.value) }} />
            </div>
            <div id={styles["results-container"]}>
            { results &&
                    results.regions.map( (region, index) => {
                        return (
                            <div 
                                key={index} 
                                className={styles["result"]} 
                                onClick={ () => { router.push('general-elections/constituency/' + constituencyToSlug(region.title)) } }
                            >
                                <h2 className={styles["result-title"]}>
                                    {highlightRelevance(region.title)}
                                </h2>
                            </div>
                        )
                    })
                }
                { results &&
                    results.candidates.map( (region, index) => {
                        return (
                            <div 
                                key={index} 
                                className={styles["result"]} 
                                onClick={ () => { router.push('general-elections/constituency/' + constituencyToSlug(region.title)) } }
                            >
                                <h2 className={styles["result-title"]}>
                                    <div 
                                        className={styles["title-bloc"]}
                                        style={{background: region.party.color || "var(--default-color)", color: region.party.textColor}}
                                    >
                                        {partyIdToDisplayId(region.party.id)}
                                    </div>
                                    {highlightRelevance(region.candidate)}
                                </h2>
                                <span style={{color: "#666"}}>{region.title} candidate, {region.election.join(" ")}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}