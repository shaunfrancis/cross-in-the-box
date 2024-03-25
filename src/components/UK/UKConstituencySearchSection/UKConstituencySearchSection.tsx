'use client';

import { Endpoint } from 'src/Constants';
import styles from './UKConstituencySearchSection.module.css';
import { SearchHandler } from 'src/lib/shared';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { constituencyToSlug } from 'src/lib/UK';

interface SearchResults{
    regions : {id : string, title : string}[], 
    candidates : {
        id : string,
        title : string,
        candidate : string
    }[]
}

export default function UKConstituencySearchSection(){
    const [results, setResults] = useState<SearchResults | null>();
    const router = useRouter();

    const handler = new SearchHandler(Endpoint + "/search/uk/");
    const search = async (query : string) => {
        const searchResults : SearchResults | null = await handler.search(query);
        setResults(searchResults ? searchResults : null);
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
                                <h2>{region.title}</h2>
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
                                <h2>{region.title}</h2>
                                <span>{region.candidate}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}