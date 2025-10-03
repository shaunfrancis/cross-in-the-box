<?php
namespace Shared;

class RegionSearchSection extends \Base\Component{
    static function render(){ ?>
        <div id="">
            <div id="">
                <input type="text" id="" spellcheck="false">
            </div>
        </div>
    <?php }
}

/* <div id={styles["container"]}>
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
                                    {highlightRelevance(currentQuery, region.title)}
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
                                {highlightRelevance(currentQuery, region.candidate)}
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
        </div>*/