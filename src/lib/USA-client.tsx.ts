import { useEffect, useState } from "react";
import { Endpoint } from "src/constants/shared";
import { parseJSONWithDates } from "./shared";

export const useLiveCloseAndCountedData = () => {
    const [liveCloseAndCountedData, setLiveCloseAndCountedData] = useState<{id : string, close : Date, counted? : number}[]>([]);

    useEffect( () => {
        const poll = async () => {
            let data = await fetch(Endpoint + '/special/usa/live-close-counted-data')
                        .then( res => res.text() )
                        .then( text => parseJSONWithDates(text, "close") );
            setLiveCloseAndCountedData(data);
            setTimeout(poll, 6000);
        };
        poll();
    }, []);

    return liveCloseAndCountedData;
}