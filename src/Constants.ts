import { Party } from "./Types";

const Endpoint = process.env.NODE_ENV == "development" ? "http://localhost:8888/elections/api" : "https://tennessine.co.uk/elections/api";

const DefaultParty : Party = {
    id: "?",
    displayId: "?",
    title: "Missing data"
};

export { Endpoint, DefaultParty }