import { Party, Poll } from 'src/Types';
import styles from './PollGraph.module.css';
import { Fragment } from 'react';
import ElectionSummaryBlocs from '../ElectionSummaryBlocs/ElectionSummaryBlocs';
import { UKTicks } from 'src/Constants';

export default function PollGraph({ polls, parties } : { polls : Poll[], parties : Party[] }){
    if(polls.length == 0) return;

    const w = 1000;
    const h = 580;

    const xAxisOffset = 80;
    const yAxisOffset = 40;

    let yLimit = 0;
    let firstPoll = Infinity, lastPoll = -Infinity;

    polls.sort((a,b) => a.start.valueOf() - b.start.valueOf());
    polls.forEach( poll => {
        poll.figures.forEach( figure => {
            if(figure.figure > yLimit) yLimit = figure.figure;
        });
        
        if(poll.centre < firstPoll) firstPoll = poll.centre;
        if(poll.centre > lastPoll) lastPoll = poll.centre;
            
    });
    yLimit = Math.ceil( yLimit / 5 ) * 5;

    const xLabels = () => {
        const labels : React.ReactNode[] = [];

        const firstYear = new Date(firstPoll).getFullYear() + 1, lastYear = new Date(lastPoll).getFullYear();
        let currentYear = firstYear;
        while(currentYear <= lastYear){
            const x = ((new Date(currentYear + "-01-01")).valueOf() - firstPoll) / (lastPoll - firstPoll) * (w - yAxisOffset) + yAxisOffset;
            labels.push(
                <Fragment key={"x-" + currentYear}>
                    <path d={"m" + x + " 0l0 " + (h - xAxisOffset)} stroke="#EEE" strokeWidth="2" />
                    <text x={x} y={h - xAxisOffset + 8} fontSize={25} textAnchor="middle" alignmentBaseline="hanging">{currentYear}</text>
                </Fragment>
            );
            currentYear++;
        }
        
        UKTicks.forEach( (tick,index) => {
            const tickDate = (new Date(tick.date)).valueOf();
            if(tickDate < firstPoll) return;
            const x = (tickDate - firstPoll) / (lastPoll - firstPoll) * (w - yAxisOffset) + yAxisOffset;
            labels.push(
                <Fragment key={"x-" + index}>
                    <path d={"m" + x + " 0l0 " + (h - xAxisOffset + 5 + tick.stack*32)} stroke="#EEE" strokeWidth="2" />
                    { tick.title[0] != "" &&
                        <text x={x} y={h - xAxisOffset + 8 + tick.stack*32} fontSize={10} textAnchor="middle" alignmentBaseline="hanging">{tick.title[0]}</text>
                    }
                    { tick.title[1] != "" &&
                        <text x={x} y={h - xAxisOffset + 8 + 10 + tick.stack*32} fontSize={10} textAnchor="middle" alignmentBaseline="hanging">{tick.title[1]}</text>
                    }
                </Fragment>
            );
        });

        return labels;
    }

    const yTicks = () => {
        const ticks : React.ReactNode[] = [];
        for(let i = 0; i < yLimit/5; i ++){
            const yPos = (h - xAxisOffset)/(yLimit/5) * i;
            ticks.push(
                <Fragment key={"y-" + i}>
                    <path d={"m" + yAxisOffset + " " + yPos + "l" + (w - yAxisOffset + 5) + " 0"} stroke="#EEE" strokeWidth="2" />
                    <text x={yAxisOffset - 8} y={yPos} 
                        alignmentBaseline="middle" textAnchor="end" fontSize={15} style={{fontWeight:"500"}}
                    >
                        {(yLimit/5 - i)*5}%
                    </text>
                </Fragment>
            )
        }
        return ( <>
            {ticks}
        </> )
    }

    const polledParties : Party[] = [];
    const getPoints = () => {
        const pointsArray : React.ReactNode[] = [];
        polls.forEach( (poll, pollIndex) => {
            poll.figures.forEach( (figure, figIndex) => {
                const party = parties.find(p => p.id == figure.party);
                if(!party) return;

                if(!polledParties.includes(party)) polledParties.push(party);

                const x = (( (poll.centre - firstPoll) / (lastPoll - firstPoll) ) * (w - yAxisOffset) + yAxisOffset).toFixed(1);
                const y = ((1 - (figure.figure / yLimit)) * (h - xAxisOffset)).toFixed(1);
                const color = party.color || "var(--default-color)";
                pointsArray.push(
                    <rect key={pollIndex + "-" + figIndex} 
                        x={parseFloat(x)-1} y={parseFloat(y)-1} 
                        width="2" height="2" opacity={0.33} fill={color} 
                    />
                );
            });
        });
        return pointsArray;
    }
    const points = getPoints();

    const getLines = () => {
        const averageLines : { path : React.ReactNode, party: Party, todaysAverage : number}[] = [];
        const dayValue = 1000 * 60 * 60 * 24, avgOverDays = 30;
        const dailyXShift = (dayValue / (lastPoll - firstPoll)) * (w - yAxisOffset);

        polledParties.forEach( (party, index) => {
            const color = party.color || "var(--default-color)";
            const relevantPolls = polls.filter(p => p.figures.find(f => f.party == party.id));

            const x = ( (relevantPolls[0].centre - firstPoll) / (lastPoll - firstPoll) ) * (w - yAxisOffset) + yAxisOffset;
            let d = "m" + x + " " + (1 - relevantPolls[0].figures.find(f => f.party == party.id)!.figure / yLimit) * (h - xAxisOffset);

            let currentDate = relevantPolls[0].centre;
            let day = ((relevantPolls[0].centre - firstPoll) / dayValue);
            let endDate = Math.min((new Date()).valueOf(), relevantPolls[relevantPolls.length - 1].centre + avgOverDays*dayValue);
            let average = 0;
            while(currentDate < endDate){
                currentDate += dayValue;
                day++;

                const lastMonthOfPolls = relevantPolls.filter( p => {
                    return p.centre >= currentDate - avgOverDays * dayValue && p.centre <= currentDate;
                });

                let numerator = 0, denominator = 0;
                lastMonthOfPolls.forEach( poll => {
                    const figure = poll.figures.find(f => f.party == party.id)!.figure;
                    const weight = avgOverDays - ((currentDate - poll.centre) / dayValue);

                    numerator += weight * figure;
                    denominator += weight;
                });
                if(denominator == 0){
                    average = -1;
                    continue;
                }

                average = numerator / denominator;

                d += "L" + (dailyXShift*day + yAxisOffset).toFixed(1) + " " + ((1 - (average / yLimit)) * (h - xAxisOffset)).toFixed(1);
            }

            averageLines.push( {
                path: <path key={index} d={d} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />,
                party: party,
                todaysAverage: average
            })
        });
        averageLines.sort( (a,b) => a.todaysAverage - b.todaysAverage );
        return averageLines;
    }
    const lines = getLines();

    const summaryBlocData = lines
        .filter(l => l.todaysAverage >= 0) //remove parties that have no figures in last {avgOverDays} days
        .map(l => { 
            return { 
                party: l.party,
                count: l.todaysAverage,
                displayCount: l.todaysAverage.toFixed(1) + "%"
            } 
        })
        .sort( (a,b) => b.count - a.count );


    return ( <>
        <ElectionSummaryBlocs data={summaryBlocData} />
        <svg className={styles["graph"]} viewBox={"0 -10 " + (w+5) + " " + (h+10)}>
            {yTicks()}
            {xLabels()}
            {points}
            {lines.map(l => l.path)}
            <path d={"m" + yAxisOffset + " 0l0 " + (h - xAxisOffset)} stroke="#000" strokeWidth="3" strokeLinecap="square" />
            <path d={"m" + yAxisOffset + " " + (h - xAxisOffset) + "l" + (w - yAxisOffset + 5) + " 0"} stroke="#000" strokeWidth="3" strokeLinecap="square" />
        </svg>
    </> )
}