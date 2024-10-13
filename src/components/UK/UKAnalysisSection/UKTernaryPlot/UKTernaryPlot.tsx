import { AnonymousResult, Party } from 'src/Types';
import styles from './UKTernaryPlot.module.css';
import { DefaultParty } from 'src/constants/shared';

export default function UKTernaryPlot( { resultSets, parties, highlightChanges = true } : 
    { resultSets : AnonymousResult[][], parties : Party[], highlightChanges? : boolean }
){
    //resultSets should be chronological order from oldest to newest
    if(resultSets.length == 0) return;

    const [w,h] = [100, 100];
    const con = parties.find(p => p.id == "con") || DefaultParty, lab = parties.find(p => p.id == "lab") || DefaultParty, ld = parties.find(p => p.id == "ld") || DefaultParty;

    //draw axes
    const axesLines : React.ReactNode[] = [];
    const axesLabels : React.ReactNode[] = [];
    for(let i=1; i<10; i++){

        //right side
        axesLines.push( 
            <path key={"rl" + i} 
                d={"M" + (51 + 5*i) + " " + (5 * Math.sqrt(3) * i) + "l-" + (10*i -1) + " 0"}
            /> 
        );
        axesLabels.push( <text key={"rt" + i} x={53 + 5*i} y={5 * Math.sqrt(3) * i} alignmentBaseline="middle">{(10-i)*10}</text> );

        //bottom
        axesLines.push( 
            <path key={"bl" + i} 
                d={"M" + (10*i - 0.6) + " " + (50 * Math.sqrt(3) + 0.8) + "l" + (5*(10 - i)-0.5).toFixed(2) + "-" + ((5*(10 - i)-0.5)*Math.sqrt(3)).toFixed(2)} 
            />
        );
        axesLabels.push( 
            <text key={"bt" + i}
                x={10*i - 2.1} y={50 * Math.sqrt(3) + 2.8} 
                alignmentBaseline="middle" 
                transform={"rotate(-60, " + (10*i - 2.1) + "," + (50 * Math.sqrt(3) + 2.8) + ")"}
            >
                {i*10}
            </text>
        );

        //left side
        axesLines.push(
            <path key={"ll" + i} 
                d={"M" + (50 - 5*i - 0.6) + " " + (5 * Math.sqrt(3) * i - 0.8) + "l" + (5*(10 - i)-0.5).toFixed(2) + " " + ((5*(10 - i)-0.5)*Math.sqrt(3)).toFixed(2)} 
            />
        );
        axesLabels.push( 
            <text key={"lt" + i}
                x={50 - 5*i - 2.1} y={5 * Math.sqrt(3) * i - 2.8} 
                alignmentBaseline="middle" 
                transform={"rotate(60, " + (50 - 5*i - 2.1) + "," + (5 * Math.sqrt(3) * i - 2.8) + ")"}
            >
                {i*10}
            </text>
        );
    }

    //draw arrows
    const arrows : React.ReactNode[] = [];
    new Set(resultSets[0].map(r => "id" in r ? r.id : -1)).forEach( id => {
        const filteredResultSets : AnonymousResult[][] = [];

        let fail = false, previousWinner : string, changedHands = false;
        resultSets.forEach( resultSet => {
            if(fail) return;
            const results = resultSet.filter(r => ("id" in r && r.id == id || -1 == id));

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

        let stemD = "", headD = "", first = true;
        let prevConShare : number, prevLdShare : number;
        filteredResultSets.forEach( (resultSet, index) => {
            const total = resultSet.reduce( (accumulator, currentValue) => accumulator + currentValue.votes, 0);
            const conShare = resultSet.find(r => r.party == "con")!.votes/total, ldShare = resultSet.find(r => r.party == "ld")!.votes/total;

            stemD += first ? "M" : "L";
            first = false;

            const x = 100 * (conShare + ldShare/2), y = (100 * Math.sqrt(3) / 2 * (1 - ldShare));

            if(index != filteredResultSets.length - 1){
                prevConShare = conShare;
                prevLdShare = ldShare;
                stemD += x.toFixed(2) + " ";
                stemD += y.toFixed(2);
            }
            else{ //add arrow head
                const dy = Math.sqrt(3) / 2 * (-ldShare + prevLdShare);
                const dx = conShare + ldShare/2 - prevConShare - prevLdShare/2;

                const M = 1; //arrow magnitude
                const theta = (dy == 0) ? 5*Math.PI/4 : Math.atan2(dy, dx) + 3*Math.PI/4;
                const baseSin = M*Math.sqrt(2)*Math.sin(theta), baseCos = M*Math.sqrt(2)*Math.cos(theta);

                stemD += (x - M*Math.cos(theta - 3*Math.PI/4)).toFixed(2) + " ";
                stemD += (y - M*Math.sin(theta - 3*Math.PI/4)).toFixed(2);

                headD = "M" + x.toFixed(2) + " " + y.toFixed(2) + "m" + baseCos + " " + baseSin + "L" + x.toFixed(2) + " " + y.toFixed(2) + "l" + -baseSin + " " + baseCos + "Z";

            }

        });

        arrows.push( <path key={"stem_" + id} d={stemD} fill="none" stroke={winner.color} opacity={highlightChanges && !changedHands ? 0.2 : undefined} strokeLinejoin="round" /> );
        arrows.push( <path key={"head_" + id} d={headD} fill={winner.color} stroke={winner.color} strokeWidth={0.1} opacity={highlightChanges && !changedHands ? 0.2 : undefined} /> );

    });

    const ternaryPlot = (
        <svg className={styles["graph"]} viewBox={"0 0 " + w + " " + h}>
            <path d={`M50 0 L25 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L75 ${25*Math.sqrt(3)}Z`} fill={ld.color} opacity={0.1} />
            <path d={`M0 ${50*Math.sqrt(3)} L25 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L50 ${50*Math.sqrt(3)}Z`} fill={lab.color} opacity={0.1} />
            <path d={`M100 ${50*Math.sqrt(3)} L75 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L50 ${50*Math.sqrt(3)}Z`} fill={con.color} opacity={0.1} />
            <path d={`M25 ${25*Math.sqrt(3)} L50 ${100/3*Math.sqrt(3)} L75 ${25*Math.sqrt(3)} M50 ${100/3*Math.sqrt(3)} L50 ${50*Math.sqrt(3)}`} fill="none" stroke="#fff" strokeWidth="1" />

            <rect x={7} y={25} width={12} height={3.8} fill={lab.color} stroke={lab.color} strokeWidth={0.5} strokeLinejoin="round"  />
            <text x={13} y={27.2} fill="#fff" fontSize={3} textAnchor="middle">
                <tspan fontWeight={500} alignmentBaseline="middle">LAB</tspan> <tspan fontWeight={400} alignmentBaseline="middle">%</tspan>
            </text>

            <rect x={81} y={25} width={12} height={3.8} fill={ld.color} stroke={ld.color} strokeWidth={0.5} strokeLinejoin="round"  />
            <text x={87} y={27.2} fill="#000" fontSize={3} textAnchor="middle">
                <tspan fontWeight={500} alignmentBaseline="middle">LD</tspan> <tspan fontWeight={400} alignmentBaseline="middle">%</tspan>
            </text>

            <rect x={44} y={95} width={12} height={3.8} fill={con.color} stroke={con.color} strokeWidth={0.5} strokeLinejoin="round"  />
            <text x={50} y={97.2} fill="#fff" fontSize={3} textAnchor="middle">
                <tspan fontWeight={500} alignmentBaseline="middle">CON</tspan> <tspan fontWeight={400} alignmentBaseline="middle">%</tspan>
            </text>

            <g stroke="#FFF" strokeWidth={0.25}>{axesLines}</g>
            <g fontSize={2} textAnchor="middle">{axesLabels}</g>

            <g strokeWidth={0.5} style={{cursor:"pointer"}}>{arrows}</g>
        </svg>
    )

    return ternaryPlot;
}