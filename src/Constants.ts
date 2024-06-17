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

export { Endpoint, DefaultParty, UKTicks }