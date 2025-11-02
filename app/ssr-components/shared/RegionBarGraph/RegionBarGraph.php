<?php
namespace Shared;
include_once './app/lib/shared.php';

class RegionBarGraph extends \Base\Component{
    
    static function render(
        array $results,                         // Result[]
        array $subtitles = [],                  // [subElectionId: string][]
        string $subElectionType = "separate",   // "separate" | "rounds"
    ){
        /*if(subElectionType == "rounds"){
            const resultsByCandidate = getResultsByCandidate(results);
            const roundCount = resultsByCandidate[0].results.length;

            const parentContainer = document.querySelector('*:has(> .' + styles["container"] + ')');
            if(parentContainer){
                if( parseInt(getComputedStyle(parentContainer as HTMLElement).getPropertyValue('--max-rounds')) < roundCount + 2 ){
                    (parentContainer as HTMLElement).style.setProperty("--max-rounds", (roundCount + 2).toString() );
                }
            }
        }*/
    ?>
            <?php
                switch($subElectionType){
                    case "separate":
                        $subElections = getResultsBySubElection($results);
                        foreach($subElections as $subElection){
                            self::renderGraph($subElection['results'], $subElectionType, $subtitles[$subElection['subid']] ?? NULL);
                        }
                        break;
                    case "rounds":
                        self::renderGraph($results, "rounds");
                        break;
                }
            ?>

    <?php }

    static function renderGraph(array $results, string $subElectionType, ?string $title = NULL){ ?>
        <div class="RegionBarGraph pre-hydration">
            <?php if($title): ?><h3><?= $title; ?></h3><?php endif; ?>
            <?php switch($subElectionType){
                case "separate":
                    self::renderStandardGraphRows($results);
                    break;
                case "rounds":
                    self::renderRoundsGraphRows($results);
                    break;
            } ?>
        </div>
    <?php }

    static function renderStandardGraphRows(array $results){
        $totalVotes = 0;
        foreach($results as $result){
            $totalVotes += $result['votes'];
        }

        foreach($results as $result){
            if($totalVotes > 0) $percentage = number_format(100 * $result['votes'] / $totalVotes, 2, '.', '');
            $elected = !empty($result['candidates'][0]['elected']);

            $votesValue = "";
            if($totalVotes > 0) $votesValue = number_format($result['votes'], 0, '.', ' ');
            else if($elected && count($results) === 1) $votesValue = "Unopposed";
            else if($elected) $votesValue = "Elected";

            ?>

            <div class="RegionBarGraph__row" data-party="<?= $result['party']; ?>">
                <div class="RegionBarGraph__party RegionBarGraph__bloc bloc">
                    <span><?= $result['party']; ?></span>
                    <div class="RegionBarGraph__hover"></div>
                </div>
                <div class="RegionBarGraph__candidate RegionBarGraph__bloc bloc" title="<?= $result['candidates'][0]['name']; ?>">
                    <?= $result['candidates'][0]['name']; ?>
                </div>
                <div class="RegionBarGraph__votes RegionBarGraph__bloc bloc tnum">
                    <?= $votesValue; ?>
                </div>

                 <div class="RegionBarGraph__percentage RegionBarGraph__bloc bloc tnum">
                    <?php if($totalVotes > 0) echo $percentage . "%"; ?>
                </div>
                
                <div class="RegionBarGraph__bar-container">
                    <div 
                        class="RegionBarGraph__bar" 
                        style="width: <?= $totalVotes > 0 ? ($percentage . "%") : ($elected ? "100%" : "0%"); ?>"
                    >
                    </div>
                </div>
            </div>
        <?php }

    }

    static function renderRoundsGraphRows(array $results){
        echo "todo";

        /*
            const roundsGraphRows = (givenResults : AnonymousResult[]) => {
            const resultsByCandidate = getResultsByCandidate(results);
            if(resultsByCandidate[0].results.length == 1) return standardGraphRows(givenResults);
            const roundCount = resultsByCandidate[0].results.length;

            let totalVotes : number[] = [];
            resultsByCandidate.forEach( candidate => {
                candidate.results.forEach( (result, index) => {
                    if(!totalVotes[index]) totalVotes[index] = result.votes;
                    else totalVotes[index] += result.votes;
                });
            });

            const rows : React.ReactNode[] = [(
                <div key="heading" className={styles["bar-graph-row"] + " " + styles["bar-graph-heading"]}>
                    <div className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]}>
                        Party
                    </div>
                    <div className={styles["bar-graph-candidate"] + " " + styles["bar-graph-bloc"]}>
                        Candidate
                    </div>
                    {
                        resultsByCandidate[0].results.map( (_, index) => (
                            <div key={index} className={styles["bar-graph-votes"] + " " + styles["bar-graph-bloc"]}>
                                Round {index + 1}
                            </div>
                        ))
                    }
                    <div className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]}>
                        Percentage
                    </div>
                </div>
            )];

            resultsByCandidate.forEach( (candidate, index) => {
                const party = parties.find( p => p.id == candidate.party ) || DefaultParty;
                const bgColor = party.color || "var(--default-color)";

                const finalPercentage = (100 * (candidate.results[roundCount - 1]?.votes / totalVotes[roundCount - 1] || 0)).toFixed(2);

                rows.push((
                    <div key={index} className={styles["bar-graph-row"]}>

                        <div 
                            className={styles["bar-graph-party"] + " " + styles["bar-graph-bloc"]} 
                            style={{background: bgColor, color: party.textColor}}
                        >
                            <span>{party.displayId || party.id}</span>
                            <div className={styles["bar-detail-hover"]}>{party.title}</div>
                        </div>

                        <div 
                            className={styles["bar-graph-candidate"] + " " + styles["bar-graph-bloc"]}
                            style={{background: bgColor, color: party.textColor}}
                        >
                            {candidate.name}
                        </div>

                        {
                            resultsByCandidate[0].results.map( (_, i) => {
                                const stillIn = resultsByCandidate[index].results[i];
                                return (
                                    <div 
                                        key={index + "-" + i}
                                        className={styles["bar-graph-votes"] + " " + styles["bar-graph-bloc"]}
                                        style={{background: bgColor, color: party.textColor, opacity: !stillIn ? 0.5 : undefined}}
                                    >
                                        {stillIn && addThousandsSpacing(resultsByCandidate[index].results[i].votes)}
                                    </div>
                                )
                            })
                        }
                        
                        <div 
                            className={styles["bar-graph-percentage"] + " " + styles["bar-graph-bloc"]}
                            style={{background: bgColor, color: party.textColor, opacity: candidate.results.length != roundCount ? 0.5 : undefined}}
                        >
                            {candidate.results.length == roundCount && finalPercentage + "%"}
                        </div>

                        <div 
                            className={styles["bar-graph-bar-container"]}
                            style={{'--rounds' : roundCount + 2} as React.CSSProperties}
                        >
                            {
                                candidate.results.map( (result, index) => {
                                    const percentage = 100 * (
                                        result.votes / totalVotes[index] 
                                        -(candidate.results[index-1]?.votes / totalVotes[index-1] || 0) );
                                    return (
                                        <div 
                                            key={"bar-" + index}
                                            className={styles["bar-graph-bar"]}
                                            style={{background: bgColor, width: percentage + "%"}}
                                        ></div>
                                    )
                                })
                            }
                        </div>
                            
                    </div>
                ));
            });

            return (<>{rows}</>);
        }
    } */
    }

}