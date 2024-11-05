export const stateWeights = {
    "2024AK":	 3,
    "2024AL":	 9,
    "2024AR":	 6,
    "2024AZ":	 11,
    "2024CA":	 54,
    "2024CO":	 10,
    "2024CT":	 7,
    "2024DC":	 3,
    "2024DE":	 3,
    "2024FL":	 30,
    "2024GA":	 16,
    "2024HI":	 4,
    "2024IA":	 6,
    "2024ID":	 4,
    "2024IL":	 19,
    "2024IN":	 11,
    "2024KS":	 6,
    "2024KY":	 8,
    "2024LA":	 8,
    "2024MA":	 11,
    "2024MD":	 10,
    "2024ME1":	 1,
    "2024ME2":	 1,
    "2024MEA":	 2,
    "2024MI":	 15,
    "2024MN":	 10,
    "2024MO":	 10,
    "2024MS":	 6,
    "2024MT":	 4,
    "2024NC":	 16,
    "2024ND":	 3,
    "2024NE1":	 1,
    "2024NE2":	 1,
    "2024NE3":	 1,
    "2024NEA":	 2,
    "2024NH":	 4,
    "2024NJ":	 14,
    "2024NM":	 5,
    "2024NV":	 6,
    "2024NY":	 28,
    "2024OH":	 17,
    "2024OK":	 7,
    "2024OR":	 8,
    "2024PA":	 19,
    "2024RI":	 4,
    "2024SC":	 9,
    "2024SD":	 3,
    "2024TN":	 11,
    "2024TX":	 40,
    "2024UT":	 6,
    "2024VA":	 13,
    "2024VT":	 3,
    "2024WA":	 12,
    "2024WI":	 10,
    "2024WV":	 4,
    "2024WY":	 3,

    "2012AK":	 3,
    "2012AL":	 9,
    "2012AR":	 6,
    "2012AZ":	 11,
    "2012CA":	 55,
    "2012CO":	 9,
    "2012CT":	 7,
    "2012DC":	 3,
    "2012DE":	 3,
    "2012FL":	 29,
    "2012GA":	 16,
    "2012HI":	 4,
    "2012IA":	 6,
    "2012ID":	 4,
    "2012IL":	 20,
    "2012IN":	 11,
    "2012KS":	 6,
    "2012KY":	 8,
    "2012LA":	 8,
    "2012MA":	 11,
    "2012MD":	 10,
    "2012ME1":	 1,
    "2012ME2":	 1,
    "2012MEA":	 2,
    "2012MI":	 16,
    "2012MN":	 10,
    "2012MO":	 10,
    "2012MS":	 6,
    "2012MT":	 3,
    "2012NC":	 15,
    "2012ND":	 3,
    "2012NE1":	 1,
    "2012NE2":	 1,
    "2012NE3":	 1,
    "2012NEA":	 2,
    "2012NH":	 4,
    "2012NJ":	 14,
    "2012NM":	 5,
    "2012NV":	 6,
    "2012NY":	 29,
    "2012OH":	 18,
    "2012OK":	 7,
    "2012OR":	 7,
    "2012PA":	 20,
    "2012RI":	 4,
    "2012SC":	 9,
    "2012SD":	 3,
    "2012TN":	 11,
    "2012TX":	 38,
    "2012UT":	 6,
    "2012VA":	 13,
    "2012VT":	 3,
    "2012WA":	 12,
    "2012WI":	 10,
    "2012WV":	 5,
    "2012WY":	 3,
};

export const senateCaucusMap = [
    {election: "S2024", region: "SVT1", caucusesWith: "dem"}, //Bernie Sanders
    {election: "S2024", region: "SME1", caucusesWith: "dem"}, //Angus King
    {election: "S2018", region: "SVT1", caucusesWith: "dem"}, //Bernie Sanders
    {election: "S2018", region: "SME1", caucusesWith: "dem"}, //Angus King
    {election: "S2018", region: "SMS2", caucusesWith: "rep"}, //MS nonpartisan special
    {election: "S2012", region: "SVT1", caucusesWith: "dem"}, //Bernie Sanders
    {election: "S2012", region: "SME1", caucusesWith: "dem"}, //Angus King
];

export const getSenatePreviousSpecialOverrides = (election : number) => {
    switch(election){
        case 2016:
            return [{id:"SAL2", party:"dem", candidate:"Doug Jones", votes:1, elected:true}];
        default:
            return [];
    }
}

export const senateGhostResults = [
    {
        election: "S2012",
        date: new Date("2012-11-06"),
        results: [
            { id:"SAZ1", party:"rep" },
            { id:"SCA1", party:"dem" },
            { id:"SCT1", party:"dem" },
            { id:"SDE1", party:"dem" },
            { id:"SFL1", party:"dem" },
            { id:"SHI1", party:"dem" },
            { id:"SHI1", party:"dem" },
            { id:"SIN1", party:"dem" },
            { id:"SME1", party:"ind" },
            { id:"SMD1", party:"dem" },
            { id:"SMA1", party:"dem" },
            { id:"SMI1", party:"dem" },
            { id:"SMN1", party:"dem" },
            { id:"SMS1", party:"rep" },
            { id:"SMO1", party:"dem" },
            { id:"SMT1", party:"dem" },
            { id:"SNE1", party:"rep" },
            { id:"SNV1", party:"rep" },
            { id:"SNJ1", party:"dem" },
            { id:"SNM1", party:"dem" },
            { id:"SNY1", party:"dem" },
            { id:"SND1", party:"dem" },
            { id:"SOH1", party:"dem" },
            { id:"SPA1", party:"dem" },
            { id:"SRI1", party:"dem" },
            { id:"STN1", party:"rep" },
            { id:"STX1", party:"rep" },
            { id:"SUT1", party:"rep" },
            { id:"SVT1", party:"ind" },
            { id:"SVA1", party:"dem" },
            { id:"SWA1", party:"dem" },
            { id:"SWV1", party:"dem" },
            { id:"SWI1", party:"dem" },
            { id:"SWY1", party:"rep" },
        ].map( result => { return { ...result, votes:0, candidate:"", elected:true } } )
    },
    {
        election: "S2010",
        date: new Date("2010-11-02"),
        results: [
            { id:"SAL3", party:"rep" },
            { id:"SAK3", party:"rep" },
            { id:"SAZ3", party:"rep" },
            { id:"SAR3", party:"rep" },
            { id:"SCA3", party:"dem" },
            { id:"SCO3", party:"dem" },
            { id:"SCT3", party:"dem" },
            { id:"SFL3", party:"rep" },
            { id:"SGA3", party:"rep" },
            { id:"SHI3", party:"dem" },
            { id:"SID3", party:"rep" },
            { id:"SIL3", party:"rep" },
            { id:"SIN3", party:"rep" },
            { id:"SIA3", party:"rep" },
            { id:"SKS3", party:"rep" },
            { id:"SKY3", party:"rep" },
            { id:"SLA3", party:"rep" },
            { id:"SMD3", party:"dem" },
            { id:"SMO3", party:"rep" },
            { id:"SNV3", party:"dem" },
            { id:"SNH3", party:"rep" },
            { id:"SNY3", party:"dem" },
            { id:"SNC3", party:"rep" },
            { id:"SND3", party:"rep" },
            { id:"SOH3", party:"rep" },
            { id:"SOK3", party:"rep" },
            { id:"SOR3", party:"dem" },
            { id:"SPA3", party:"rep" },
            { id:"SSC3", party:"rep" },
            { id:"SSD3", party:"rep" },
            { id:"SUT3", party:"rep" },
            { id:"SVT3", party:"dem" },
            { id:"SWA3", party:"dem" },
            { id:"SWI3", party:"rep" },
        ].map( result => { return { ...result, votes:0, candidate:"", elected:true } } )
    },
];

export const governorCaucusMap : {election : string, region : string, caucusesWith : string}[] = [
];

export const governorGhostResults = [
    {
        election: "G2015",
        date: new Date("2015-11-03"),
        results: [
            { id:"GKY", party:"rep" },
            { id:"GLA", party:"dem" },
            { id:"GMS", party:"rep" },
        ].map( result => { return { ...result, votes:0, candidate:"", elected:true } } )
    },
    {
        election: "G2014",
        date: new Date("2014-11-04"),
        results: [
            { id:"GAL", party:"rep" },
            { id:"GAK", party:"ind" },
            { id:"GAZ", party:"rep" },
            { id:"GAR", party:"rep" },
            { id:"GCA", party:"dem" },
            { id:"GCO", party:"dem" },
            { id:"GCT", party:"dem" },
            { id:"GFL", party:"rep" },
            { id:"GGA", party:"rep" },
            { id:"GHI", party:"dem" },
            { id:"GID", party:"rep" },
            { id:"GIL", party:"rep" },
            { id:"GIA", party:"rep" },
            { id:"GKS", party:"rep" },
            { id:"GME", party:"rep" },
            { id:"GMD", party:"rep" },
            { id:"GMA", party:"rep" },
            { id:"GMI", party:"rep" },
            { id:"GMN", party:"dem" },
            { id:"GNE", party:"rep" },
            { id:"GNV", party:"rep" },
            { id:"GNH", party:"dem" },
            { id:"GNM", party:"rep" },
            { id:"GNY", party:"dem" },
            { id:"GOH", party:"rep" },
            { id:"GOK", party:"rep" },
            { id:"GOR", party:"dem" },
            { id:"GPA", party:"dem" },
            { id:"GRI", party:"dem" },
            { id:"GSC", party:"rep" },
            { id:"GSD", party:"rep" },
            { id:"GTN", party:"rep" },
            { id:"GTX", party:"rep" },
            { id:"GVT", party:"dem" },
            { id:"GWI", party:"rep" },
            { id:"GWY", party:"rep" },
        ].map( result => { return { ...result, votes:0, candidate:"", elected:true } } )
    },
    {
        election: "G2013",
        date: new Date("2013-11-05"),
        results: [
            { id:"GNJ", party:"rep" },
            { id:"GVA", party:"dem" },
        ].map( result => { return { ...result, votes:0, candidate:"", elected:true } } )
    },
];

export function subidLabels(id: string): { [key: string]: string };
export function subidLabels(id: string, subid: number): string | undefined;
export function subidLabels(id : string, subid? : number){

    let subtitles : { [key : string] : string };
    if(id.includes("LA")){ //Louisiana
        subtitles = {"1": "Jungle primary", "2": "Runoff"};
    }

    else subtitles = {"1": "First round", "2": "Runoff"};

    if(subid === undefined) return subtitles;
    else if(Object.keys(subtitles).includes(subid.toString())) return subtitles[subid.toString()];
    
};

export const electionType = (id : string) => {
    if(
        (id.includes("ME") && id != "GME") ||       //Maine governor is not RCV
        id.includes("AK")
    ) return "rounds";
    else return "separate";
}

export const USASeatsToWatch = [
    {id: "2024PA", note: "With 19 electoral votes at stake, this state is a must-win for Harris and Trump; without it, the path to victory is much harder. In 2020, Biden won the Keystone State by one percentage point, and polls show a tied race this year."},
    {id: "2024NC", note: "Narrowly voting Republican since 2008, the Tar Heel State's 16 electoral votes are crucial for Trump, but controversy surrounding the GOP's nominee for governor threatens to tilt the state in Harris's direction."},
    {id: "2024GA", note: "The closest result in 2020 - and the last state to be called for either candidate. In the end, Biden took it by just 12,000 votes out of five million. Trump needs to be winning these 16 electoral votes, and polling shows him up here - just."},
    {id: "2024WI", note: "Decided by less than one percentage point in 2020 and 2016, Harris needs a win here to be on track to claim the presidency. Polling shows a tied race here once again."},
    {id: "2024AZ", note: "Voting Democratic in 2020 for the first time since 1996, by just 10,000 votes, polling shows the Grand Canyon State leaning back towards Trump, in what is possibly his best chance at flipping a state."},
    {id: "2024MI", note: "In 2016, the Great Lakes State narrowly voted for Trump, while in 2020 it broke for Biden. Polling shows an even tighter race this year, with Harris up by under one percentage point."},
    {id: "2024NV", note: "Trump narrowly failed to win here in 2016 and 2020, but polling this year puts him slightly ahead of Harris."},
    {id: "2024IA", note: "A late and surprising addition to our \"states to watch\", Iowa voted for Trump by nine percentage points in 2016 and 2020, but a recent poll by Selzer - widely regarded as the gold standard of polling - put Harris ahead by three. If this turns out to be remotely correct, it's likely to have implications across other, crucial Midwestern states."},
    {id: "SMT1", note: "Incumbent Democratic Senator Jon Tester is facing an uphill battle to keep his seat in this red state. Sparse polling puts his Republican challenger up by five. A loss here would be a blow to the Democrats' chances of retaining the Senate."},
    {id: "SNE1", note: "Independent candidate Dan Osborn is putting up a strong challenge to the incumbent Republican Senator in this deep red state. With no Democrat on the ballot, Osborn winning here could cost Republicans the Senate."},
    {id: "STX1", note: "Republican Ted Cruz is up for re-election to the Senate this year, having prevailed in 2018 by just two percentage points. Polling shows him narrowly ahead of his Democratic rival."},
    {id: "SOH1", note: "Democrat Sherrod Brown is hoping to win his fourth term in the Senate. Ohio has been trending Republican for years, and polling puts him up just one percentage point. "},
];