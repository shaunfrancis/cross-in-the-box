'use client';

import PollGraph from 'src/components/shared/PollGraph/PollGraph';
import styles from './UKPollingSection.module.css';
import { useEffect, useState } from 'react';
import { Endpoint } from 'src/Constants';
import { parseJSONWithDates } from 'src/lib/shared';
import { Party, Poll, PollFigure, PollSkeleton } from 'src/Types';
import PollTable from 'src/components/shared/PollTable/PollTable';

export default function UKPollingSection({ parties } : { parties : Party[] }){

    const [pollData, setPollData] = useState<Poll[]>([]);
    useEffect( () => {
        const getData = async () => {
            const data : {polls: PollSkeleton[], figures: PollFigure[]} = await fetch(Endpoint + "/polls/uk")
                .then( res => res.text() )
                .then( res => parseJSONWithDates(res, ["start","end"]));

            const downloadedPolls : Poll[] = [];

            data.polls.forEach( skeleton => {
                const figures : PollFigure[] = data.figures.filter( f => f.poll_id == skeleton.id );

                const centre = (skeleton.end.valueOf() - skeleton.start.valueOf()) / 2 + skeleton.start.valueOf();

                downloadedPolls.push({...skeleton, centre: centre, figures: figures});
            });
            
            downloadedPolls.sort((a,b) => b.start.valueOf() - a.start.valueOf());

            setPollData(downloadedPolls);
        };
        getData();
    }, []);

    return (
        <div id={styles["tracker-container"]}>
            <div id={styles["graph-container"]}>
                <h2>Voting Intention</h2>
                <PollGraph polls={pollData} parties={parties} />
            </div>
            <div style={{width:"550px"}}>
                <h2>Latest Polls</h2>
                <PollTable polls={pollData} parties={parties} maxPolls={9} maxParties={5} />
            </div>
        </div>
    )
}