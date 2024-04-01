'use client';

import PollGraph from 'src/components/shared/PollGraph/PollGraph';
import styles from './UKPollingSection.module.css';
import { useEffect, useState } from 'react';
import { Endpoint } from 'src/Constants';
import { parseJSONWithDates } from 'src/lib/shared';
import { Party, Poll, PollFigure, PollSkeleton } from 'src/Types';

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
                downloadedPolls.push({...skeleton, figures: figures});
            });


            setPollData(downloadedPolls);
        };
        getData();
    }, []);

    return (
        <div id={styles["graph-container"]}>
            <h1>Poll Tracker</h1>
            <PollGraph polls={pollData} parties={parties} />
        </div>
    )
}