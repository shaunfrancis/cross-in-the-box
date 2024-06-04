import { useState } from "react";
import styles from "./Toggle.module.css";

export default function Toggle( { from, to, fun, value } : { from : string, to : string, fun : (state: boolean) => any, value?: boolean }){
    const [state, setState] = useState<boolean>(false);

    const valueProvided = (typeof value == "undefined") ? false : true;
    
    let nextState = valueProvided ? !value : !state;

    return (
        <div className={styles["toggle-container"]}>

            <img src={from} onClick={() => { fun(false); setState(false) }} />

            <div 
                className={styles["toggle-outer"]}
                onClick={() => {
                    if(valueProvided) nextState = !value;
                    else nextState = !state;

                    fun(nextState); 
                    setState(nextState);
                }}
            >

                <div className={styles["toggle-inner"] + ( ( (valueProvided && value) || (!valueProvided && state) ) ? " " + styles["toggled"] : "")}></div>

            </div>
            
            <img src={to} onClick={() => { fun(true); setState(true) }} />

        </div>
    )
}