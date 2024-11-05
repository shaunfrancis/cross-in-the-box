'use client';

import { Endpoint } from 'src/constants/shared';
import styles from './UKConstituencySearchSection.module.css';
import { SearchHandler } from 'src/lib/shared';
import { RefObject, useRef, useState } from 'react';
import { constituencyToSlug, partyIdToDisplayId } from 'src/lib/UK';
import { SearchResults, Party } from 'src/Types';
import Link from 'next/link';

export default function UKConstituencySearchSection( {searchInputRef} : {searchInputRef? : RefObject<HTMLInputElement>} ){
    const [results, setResults] = useState<SearchResults | null>();
    const [displayCount, setDisplayCount] = useState<number>(15);
    const [currentQuery, setCurrentQuery] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const handler = useRef(new SearchHandler(Endpoint + "/search/uk/"));
    const search = async (query : string) => {
        if(query.length >= 3) setStatus("Searching..."); 
        else setStatus("");

        const searchResults : SearchResults | null = await handler.current.search(query);
        
        if(searchResults && searchResults.regions.length + searchResults.candidates.length == 0) setStatus("No results found.");
        else if(searchResults) setStatus("");

        setDisplayCount(15);
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
                <input 
                    ref={searchInputRef}
                    type="text" id={styles["search-bar"]} spellCheck={false} 
                    onChange={(event) => { search(event.target.value) }}
                    onMouseUp={(event) => { (event.target as HTMLInputElement).setSelectionRange(0, (event.target as HTMLInputElement).value.length) }}
                />
            </div>
            <div id={styles["status-container"]}>
                {status}
            </div>
            <div id={styles["results-container"]}>
            { results &&
                    results.regions.map( (region, index) => {
                        if(index >= displayCount) return;
                        return (
                            <Link key={index} href={'/uk/general-elections/constituency/' + constituencyToSlug(region.title)} className={styles["result"] + " unstyled"}>
                                <h2 className={styles["result-title"]}>
                                    {highlightRelevance(region.title)}
                                </h2>
                                {!region.current && <span style={{color: "#666"}}>Abolished constituency</span>}
                            </Link>
                        )
                    })
                }
            { results &&
                results.candidates.map( (region, index) => {
                    if(results.regions.length + index >= displayCount) return;
                    return (
                        <Link key={index} href={'/uk/general-elections/constituency/' + constituencyToSlug(region.title)} className={styles["result"] + " unstyled"}>
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
                        </Link>
                    )
                })
            }
            </div>

            { results && displayCount < results.regions.length + results.candidates.length &&
                <button className={"button " + styles["load-button"]} onClick={() => { setDisplayCount(displayCount + 18) }}>
                    Show More
                </button>
            }
        </div>
    )
}