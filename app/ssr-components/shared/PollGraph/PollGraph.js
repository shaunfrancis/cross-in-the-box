import Elt from 'components/shared/_Elt/_Elt';
import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';

window.addEventListener('DOMContentLoaded', async () => {
    if(CachedData.parties.length === 0) await CachedData.fetchParties();

    const containerMap = new WeakMap();

    const graphObserver = new IntersectionObserver( (entries, observer) => {
        entries.forEach( async entry => {
            if(entry.isIntersecting){
                observer.unobserve(entry.target);
                drawGraph(containerMap, entry.target);
                entry.target.classList.remove('pre-hydration');
            }
        });
    });

    for(const container of document.querySelectorAll('.PollGraph')){

        const svg = container.querySelector('svg');
        const json = container.querySelector('.PollGraph__data');
        if(!json) return;
        const {polls, w, h, compact, averages, maxParties, labelledTicks} = parseJSONWithDates(json.innerHTML, ["start", "end"]);
        json.remove();
        containerMap.set(container, {svg, json, polls, w, h, compact, labelledTicks});

        let summaries = [];
        Object.entries(averages).forEach( ([party, average]) => {
            if(party === "other" || average.count < 5) return;
            summaries.push({
                party: CachedData.parties.find( p => p.id === party ) || DefaultParty,
                count: average.value,
                displayCount: average.value.toFixed(1) + "%"
            })
        });
        summaries.sort( (a,b) => b.count - a.count );
        if(maxParties) summaries = summaries.slice(0, maxParties);

        container.insertBefore(
            ElectionSummaryBlocs.render({ data: summaries, blocWidth: "100px" }),
            svg
        );

        graphObserver.observe(container);
    }
});

function drawGraph(containerMap, container){
    const {svg, polls, w, h, compact, labelledTicks} = containerMap.get(container);

    const xAxisOffset = 60;
    const yAxisOffset = compact ? 80 : 40;

    const fontScale = compact ? 1.5 : 1;

    let yLimit = 0;
    let firstPoll = Infinity, lastPoll = -Infinity;

    polls.sort((a,b) => a.start.valueOf() - b.start.valueOf());
    polls.forEach( poll => {
        poll.centre = new Date((poll.start.getTime() + poll.end.getTime()) / 2);

        poll.figures.forEach( figure => {
            if(figure.figure > yLimit) yLimit = figure.figure;
        });
        
        if(poll.centre < firstPoll) firstPoll = poll.centre;
        if(poll.centre > lastPoll) lastPoll = poll.centre;
            
    });
    yLimit = Math.ceil( yLimit / 5 ) * 5;
    

    const xLabels = () => {
        const labels = [];

        const firstYear = firstPoll.getFullYear() + 1, lastYear = lastPoll.getFullYear();
        let currentYear = firstYear;
        while(currentYear <= lastYear){
            const x = ((new Date(currentYear + "-01-01")).valueOf() - firstPoll) / (lastPoll - firstPoll) * (w - yAxisOffset) + yAxisOffset;
            labels.push(
                new Elt({
                    tag: 'path',
                    ns: 'svg',
                    d: "m" + x + " 0l0 " + (h - xAxisOffset),
                    stroke: '#EEE',
                    "stroke-width": 2
                }),
                new Elt({
                    tag: 'text',
                    ns: 'svg',
                    x: x,
                    y: h - xAxisOffset + 8,
                    "font-size": fontScale * 25,
                    "text-anchor": "middle",
                    "alignment-baseline": "hanging",
                    innerHTML: currentYear
                })                        
            );
            currentYear++;
        }
        
        const backgroundLabels = [];
        if(!compact) labelledTicks.forEach( tick => {
            const tickDate = (new Date(tick.date)).valueOf();
            if(tickDate < firstPoll) return;
            const x = (tickDate - firstPoll) / (lastPoll - firstPoll) * (w - yAxisOffset) + yAxisOffset;
            backgroundLabels.push( new Elt({
                tag: 'path',
                ns: 'svg',
                d: "m" + x + " 0l0 " + (h - xAxisOffset + 5 + tick.stack*32),
                stroke: '#EEE',
                "stroke-width": 2
            }) );

            if(tick.title[0] != "") labels.push( new Elt({
                tag: 'text', ns: 'svg', x: x, y: h - xAxisOffset + 8 + tick.stack*32, "font-size": fontScale*10, "text-anchor": "middle", "alignment-baseline": "hanging", innerHTML: tick.title[0]
            }));                
            if(tick.title[1] != "") labels.push( new Elt({
                tag: 'text', ns: 'svg', x: x, y: h - xAxisOffset + 8 + 10 + tick.stack*32, "font-size": fontScale*10, "text-anchor": "middle", "alignment-baseline": "hanging", innerHTML: tick.title[1]
            }));

        });

        return [...backgroundLabels, ...labels];
    }

    const yTicks = () => {
        const ticks = [];
        const steps = compact ? 10 : 5;
        for(let i = 0; i < yLimit/steps; i ++){
            const yPos = (h - xAxisOffset)/(yLimit/steps) * i;
            ticks.push(
                new Elt({
                    tag: 'path',
                    ns: 'svg',
                    d: "m" + yAxisOffset + " " + yPos + "l" + (w - yAxisOffset + 5) + " 0",
                    stroke: '#EEE',
                    "stroke-width": 2
                }),
                new Elt({
                    tag: 'text',
                    ns: 'svg',
                    x: yAxisOffset - 8,
                    y: yPos,
                    "alignment-baseline": "middle",
                    "text-anchor": "end",
                    "font-size": fontScale * 15,
                    style: {"font-weight": 500},
                    innerHTML: (yLimit/steps - i) * steps + "%"
                })
            )
        }

        return ticks;
    }


    const polledParties = [];
    const getPoints = () => {
        const pointsArray = [];
        polls.forEach( poll => {
            poll.figures.forEach( figure => {
                const party = CachedData.parties.find(p => p.id == figure.party);
                if(!party) return;

                if(!polledParties.includes(party)) polledParties.push(party);

                const x = (( (poll.centre - firstPoll) / (lastPoll - firstPoll) ) * (w - yAxisOffset) + yAxisOffset).toFixed(1);
                const y = ((1 - (figure.figure / yLimit)) * (h - xAxisOffset)).toFixed(1);
                const color = party.color || "var(--default-color)";

                const size = ((poll.sample || -1) > 100000) ? 8 : 2;
                pointsArray.push( new Elt({
                    tag: 'rect',
                    ns: 'svg',
                    x: parseFloat(x) - size/2,
                    y: parseFloat(y) - size/2,
                    width: size,
                    height: size,
                    opacity: 1/3,
                    fill: color
                }) );
            });
        });
        return pointsArray;
    }
    

    const getLines = () => {
        const averageLines = [];
        const dayValue = 1000 * 60 * 60 * 24, avgOverDays = 30;
        const dailyXShift = (dayValue / (lastPoll - firstPoll)) * (w - yAxisOffset);

        polledParties.forEach( party => {
            const color = party.color || "var(--default-color)";
            let relevantPolls = polls.filter(p => p.figures.find(f => f.party == party.id));
            
            // do not show lines until there are at least 5 polls in the last month
            if(relevantPolls.filter( poll => {
                return poll.centre >= relevantPolls[relevantPolls.length - 1].centre - avgOverDays * dayValue
            }).length < 5) return;

            let d = "";

            let currentDate = relevantPolls[0].centre.valueOf();
            let day = ((relevantPolls[0].centre - firstPoll) / dayValue);
            let endDate = Math.min((new Date()).valueOf(), relevantPolls[relevantPolls.length - 1].centre.valueOf() + avgOverDays*dayValue);
            let average = 0;
            let nextIsMove = true;

            while(currentDate < endDate){
                currentDate += dayValue;
                day++;

                const lastMonthOfPolls = relevantPolls.filter( p => {
                    return p.centre >= currentDate - avgOverDays * dayValue && p.centre <= currentDate;
                });

                let numerator = 0, denominator = 0;
                lastMonthOfPolls.forEach( poll => {
                    const figure = poll.figures.find(f => f.party == party.id).figure;
                    const weight = avgOverDays - ((currentDate - poll.centre) / dayValue);

                    numerator += weight * figure;
                    denominator += weight;
                });
                if(denominator == 0){
                    average = -1;
                    continue;
                }

                average = numerator / denominator;

                let totalPollsInLastMonth;
                if(lastMonthOfPolls.length < 3) totalPollsInLastMonth = polls.filter( p => {
                    return p.centre >= currentDate - avgOverDays * dayValue && p.centre <= currentDate;
                }).length;

                if(lastMonthOfPolls.length >= 3 || (totalPollsInLastMonth <= 6 && !nextIsMove)){
                    d += nextIsMove ? "M" : "L";
                    nextIsMove = false;
                    d += (dailyXShift*day + yAxisOffset).toFixed(1) + " " + ((1 - (average / yLimit)) * (h - xAxisOffset)).toFixed(1);
                }
                else nextIsMove = true;
            }

            averageLines.push( {
                path: new Elt({
                    tag: 'path', ns: 'svg', d: d, fill: 'none', stroke: color, "stroke-width": 3.5, "stroke-linejoin": "round"
                }),
                party: party,
                todaysAverage: average
            });
        });
        averageLines.sort( (a,b) => a.todaysAverage - b.todaysAverage );
        return averageLines;
    }

    svg.append(
        ...yTicks(), 
        ...xLabels(),
        ...getPoints(),
        ...(getLines().map(line => line.path)),
        new Elt({
            tag: 'path',
            ns: 'svg',
            d: "m" + yAxisOffset + " 0l0 " + (h - xAxisOffset),
            stroke: '#000',
            "stroke-width": 3,
            "stroke-linecap": "square"
        }),
        new Elt({
            tag: 'path',
            ns: 'svg',
            d: "m" + yAxisOffset + " " + (h - xAxisOffset) + "l" + (w - yAxisOffset + 5) + " 0",
            stroke: '#000',
            "stroke-width": 3,
            "stroke-linecap": "square"
        })
    );
}