import { Party, Result } from 'src/Types';
import styles from './UKTernaryPlot.module.css';
import { DefaultParty } from 'src/Constants';

export default function UKTernaryPlot( { resultSets, parties } : { resultSets : Result[][], parties : Party[] } ){
    //resultSets should be chronological order from oldest to newest

    const [w,h] = [100, 100];
    const con = parties.find(p => p.id == "con") || DefaultParty, lab = parties.find(p => p.id == "lab") || DefaultParty, ld = parties.find(p => p.id == "ld") || DefaultParty;

    const arrows : React.ReactNode[] = [];
    new Set(resultSets[0].map(r => r.id)).forEach( id => {
        const filteredResultSets : Result[][] = [];

        let fail = false, previousWinner : string, changedHands = false;
        resultSets.forEach( resultSet => {
            if(fail) return;
            const results = resultSet.filter(r => r.id == id);

            if(results.find(r => r.party == "snp")) return fail = true; //ignore Scotland

            if( !results.find(r => r.party == "con") || !results.find(r => r.party == "lab") ||!results.find(r => r.party == "ld") ){
                return fail = true; //ignore where these didn't run
            }

            if(!["con","lab","ld"].includes(results.find(r => r.elected)?.party || "")) return fail = true; //ignore where another party won

            const winner = results.find(r => r.elected)!.party;
            if(previousWinner && previousWinner != winner) changedHands = true;
            previousWinner = winner;

            filteredResultSets.push(results.filter(r => ["con","lab","ld"].includes(r.party)));

        });
        if(fail) return;

        const winner = parties.find(p => p.id == filteredResultSets[filteredResultSets.length-1].find(r => r.elected)?.party) || DefaultParty;

        let d = "", first = true;
        let prevConShare : number, prevLdShare : number;
        filteredResultSets.forEach( (resultSet, index) => {
            const total = resultSet.reduce( (accumulator, currentValue) => accumulator + currentValue.votes, 0);
            const conShare = resultSet.find(r => r.party == "con")!.votes/total, ldShare = resultSet.find(r => r.party == "ld")!.votes/total;

            d += first ? "M" : "L";
            first = false;

            const x = 100 * (conShare + ldShare/2), y = (100 * Math.sqrt(3) / 2 * (1 - ldShare));

            if(index != filteredResultSets.length - 1){
                prevConShare = conShare;
                prevLdShare = ldShare;
                d += x.toFixed(2) + " ";
                d += y.toFixed(2);
            }
            else{ //add arrow head
                const dy = Math.sqrt(3) / 2 * (-ldShare + prevLdShare);
                const dx = conShare + ldShare/2 - prevConShare - prevLdShare/2;

                const M = 0.5; //arrow magnitude
                const theta = (dy == 0) ? 5*Math.PI/4 : Math.atan2(dy, dx) + 3*Math.PI/4;
                const baseSin = M*Math.sqrt(2)*Math.sin(theta), baseCos = M*Math.sqrt(2)*Math.cos(theta);

                d += (x - M*Math.cos(theta - 3*Math.PI/4)).toFixed(2) + " ";
                d += (y - M*Math.sin(theta - 3*Math.PI/4)).toFixed(2);

                d += "M" + x.toFixed(2) + " " + y.toFixed(2) + "m" + baseCos + " " + baseSin + "L" + x.toFixed(2) + " " + y.toFixed(2) + "l" + -baseSin + " " + baseCos + "Z";

            }

        });


        arrows.push(
            <path 
                key={"arrow-" + id}
                d={d}
                stroke={winner.color}
                opacity={changedHands ? "" : 0.2}
            />
        )


    });

    const ternaryPlot = (
        <svg className={styles["graph"]} viewBox={"0 0 " + w + " " + h}>
            <path d={`M50 0 L25 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L75 ${25*Math.sqrt(3)}Z`} fill={ld.color} opacity={0.1} />
            <path d={`M0 ${50*Math.sqrt(3)} L25 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L50 ${50*Math.sqrt(3)}Z`} fill={lab.color} opacity={0.1} />
            <path d={`M100 ${50*Math.sqrt(3)} L75 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L50 ${50*Math.sqrt(3)}Z`} fill={con.color} opacity={0.1} />
            <path d={`M25 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L75 ${25*Math.sqrt(3)} M50 ${100/3*Math.sqrt(3)} L50 100`} fill="none" stroke="#fff" strokeWidth="1" />
            <g strokeWidth={0.4} fill="none">
                {arrows}
            </g>
        </svg>
    )

    return (
        <section className={styles["container"]}>
            <h1>Ternary Plot</h1>
            {ternaryPlot}
        </section>
    )
}