import { Party } from "../Types";

const Endpoint = process.env.NODE_ENV == "development" ? "http://localhost:8888/elections/api" : "https://crossinthebox.com/api";

const DefaultParty : Party = {
    id: "?",
    displayId: "?",
    title: "Missing data",
    color: "var(--default-color)"
};

export { Endpoint, DefaultParty }