import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function UK(){
    const links = [
        {title: "General Elections", path: "general-elections"},
        {title: "Scottish Parliament", path: "scottish-parliament-elections" },
        {title: "Senedd", path: "senedd-elections" }
    ];

    return ( <>
        <Header links={links} />
        <Outlet />
    </> )
}