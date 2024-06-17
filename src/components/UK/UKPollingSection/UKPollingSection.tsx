'use client';

import PollGraph from 'src/components/shared/PollGraph/PollGraph';
import styles from './UKPollingSection.module.css';
import { useEffect, useState } from 'react';
import { Party, Poll } from 'src/Types';
import PollTable from 'src/components/shared/PollTable/PollTable';
import { parsePollData } from 'src/lib/UK';

export default function UKPollingSection({ parties } : { parties : Party[] }){

    const [pollData, setPollData] = useState<Poll[]>([]);
    useEffect( () => {
        parsePollData().then( downloadedPolls => {
            setPollData(downloadedPolls);
        }); 
    }, []);

    return (
        <div id={styles["tracker-container"]}>
            <div id={styles["graph-container"]}>
                <h2>Polling Averages</h2>
                <PollGraph polls={pollData} parties={parties} maxParties={5} compact={true} />
            </div>
            <div id={styles["table-container"]}>
                <h2>Latest Polls</h2>
                <PollTable polls={pollData} parties={parties} maxPolls={7} maxParties={5} compact={true} />
            </div>
        </div>
    )
}