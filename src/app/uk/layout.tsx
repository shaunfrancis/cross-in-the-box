import Header from "src/components/shared/Header/Header";

export default function UKLayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "General Elections", path: "general-elections"},
        {title: "Scottish Parliament", path: "scottish-parliament-elections" },
        {title: "Senedd", path: "senedd-elections" }
    ];

    return ( <>
        <Header links={links} />
        {children}
    </> )
}