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
    {id: "2024085", note: "The Green Party's only seat is potentially at risk following the decision by incumbent Caroline Lucas to step down."}, //Brighton Pavilion
    {id: "2024089", note: "Co-leader of the Green Party, Carla Denyer, is hoping to secure the Greens' second ever Commons seat."}, //Bristol Central
    {id: "2024136", note: "Reform UK leader Nigel Farage is running here - his eighth attempt at being elected MP - and polling suggests he has a chance of taking it."}, //Clacton
    {id: "2024334", note: "Chancellor Jeremy Hunt is fighting to keep his seat in the newly created Godalming and Ash constituency against an expected strong challenge from the Liberal Democrats."}, //Godalming and Ash
    {id: "2024269", note: "Former Labour leader Jeremy Corbyn is attempting to hold his seat as an independent after being expelled from the Labour party."}, //Islington North
]

export { Endpoint, DefaultParty, UKTicks, UKSeatsToWatch }