import { useState } from "react";
import styles from "./Toggle.module.css";

export default function Toggle( { from, to, fun } : { from : string, to : string, fun : (state: boolean) => any }){
    const [state, setState] = useState<boolean>(false);

    return (
        <div className={styles["toggle-container"]}>
            <img src={from} onClick={() => { fun(false); setState(false) }} />
            <div className={styles["toggle-outer"]} onClick={() => { fun(!state); setState(!state) }}>
                <div className={styles["toggle-inner"] + (state ? " " + styles["toggled"] : "")}></div>
            </div>
            <img src={to} onClick={() => { fun(true); setState(true) }} />
        </div>
    )
}