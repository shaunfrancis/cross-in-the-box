import Header from "src/components/shared/Header/Header";

export default function UKLayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "General Elections", path: "/uk/general-elections"},
        {title: "Scottish Parliament", path: "/uk/scottish-parliament-elections" },
        {title: "Senedd", path: "/uk/senedd-elections" }
    ];

    return ( <>
        <Header links={links} />
        {children}
    </> )
}