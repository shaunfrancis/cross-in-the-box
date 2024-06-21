import { Party } from "./Types";

const Endpoint = process.env.NODE_ENV == "development" ? "http://localhost:8888/elections/api" : "https://crossinthebox.com/api";

const DefaultParty : Party = {
    id: "?",
    displayId: "?",
    title: "Missing data",
    color: "var(--default-color)"
};

const UKTicks = [
    {date: "2017-06-08", stack:0, title: ["General","Election"]},
    {date: "2018-07-12", stack:0, title: ["Chequers Agreement","Announced"]},
    {date: "2019-05-23", stack:1, title: ["EU Elections","Held in UK"]},
    {date: "2019-07-24", stack:0, title: ["Johnson","Becomes PM"]},
    {date: "2019-12-12", stack:0, title: ["General","Election"]},
    {date: "2020-04-04", stack:0, title: ["Starmer Becomes","Labour Leader"]},
    {date: "2020-08-27", stack:0, title: ["Davey Becomes","Liberal Democrat Leader"]},
    {date: "2021-05-06", stack:0, title: ["Local Elections",""]},
    {date: "2022-05-05", stack:0.5, title: ["Local Elections",""]},
    {date: "2022-07-07", stack:0, title: ["Johnson Resigns",""]},
    {date: "2022-09-06", stack:0.5, title: ["Truss Becomes PM",""]},
    {date: "2022-10-25", stack:1, title: ["Sunak","Becomes PM"]},
    {date: "2023-05-04", stack:0, title: ["Local Elections",""]},
    {date: "2024-05-02", stack:0, title: ["Local Elections",""]},
];

const UKSeatsToWatch = [
    {id: "2024569", note: "Outgoing Scottish Conservative leader Douglas Ross is running here. Having already announced his intention to resign as leader, he has also promised to resign as an MSP if he is elected MP."}, //Aberdeenshire North and Moray East
    {id: "2024006", note: "Reform UK's only MP - defecting Conservative Lee Anderson - is hoping to retain his seat here. Things are further complicated by Ashfield Independents candidate Jason Zadrozny, who came a respectable second in 2019."}, //Ashfield,
    {id: "2024085", note: "The Green Party's only seat is potentially at risk following the decision by incumbent Caroline Lucas to step down."}, //Brighton Pavilion
    {id: "2024089", note: "Co-leader of the Green Party, Carla Denyer, is hoping to secure the Greens' second ever Commons seat."}, //Bristol Central
    {id: "2024136", note: "Reform UK leader Nigel Farage is running here - his eighth attempt at being elected MP - and polling suggests he has a chance of taking it."}, //Clacton
    {id: "2024334", note: "Chancellor Jeremy Hunt is fighting to keep his seat in the newly created Godalming and Ash constituency against an expected strong challenge from the Liberal Democrats."}, //Godalming and Ash
    {id: "2024269", note: "Former Labour leader Jeremy Corbyn is attempting to hold his seat as an independent after being expelled from the Labour party."}, //Islington North
    {id: "2024552", note: "Sorcha Eastwood has a chance to secure the Alliance Party's second seat here in the seat vacated by former DUP leader Jeffrey Donaldson."}, //Lagan Valley
    {id: "2024556", note: "The Alliance Party's Stephen Farry is hoping to hold this seat against the independent former DUP candidate Alex Easton."}, //North Down
    {id: "2024403", note: "Workers Party leader George Galloway won this seat in a landslide in February's by-election after Labour were forced to withdraw support for their candidate. He's hoping to retain this seat at the general election."}, //Rochdale
    {id: "2024401", note: "Could Rishi Sunak become the first Prime Minister to lose his seat? Probably not, but recent polls have suggested it's possible this very safe seat is a lot tighter than usual."} //Richmond and Northallerton
]

export { Endpoint, DefaultParty, UKTicks, UKSeatsToWatch }