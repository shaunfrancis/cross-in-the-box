import styles from './LiveCloseAndCountedData.module.css';

export default function LiveCloseAndCountedData( {id, data} : { id : string, data : {id : string, close : Date, counted? : number}[] } ){
    const datum = data.find( d => d.id === id );
    if(!datum) return;

    if(datum.counted) return (
        <span className={styles["note"]}>Estimated {datum.counted}% counted</span>
    );
    else{
        const timeUntilPollsClose = Math.floor( (datum.close.valueOf() - (new Date()).valueOf()) / 1000 / 60 );
        const timeUnit = "minute" + (timeUntilPollsClose != 1 ? "s" : "");

        if(timeUntilPollsClose < 0) return (
            <span className={styles["note"]}>Polls are closed</span>
        );
        else return (
            <span className={styles["note"]}>Polls close in {timeUntilPollsClose} {timeUnit}</span>
        );
    }
}