import { Metadata } from "next";
import Header from "src/components/shared/Header/Header";

export const metadata: Metadata = {
    title: {
      template: '%s - United Kingdom - Cross In The Box',
      default: 'United Kingdom'
    },
    description: '',
  }

export default function UKLayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "General Elections", path: "/uk/general-elections"},
        {title: "Scottish Parliament", path: "https://politics.tennessine.co.uk/uk/scottish-parliament-elections/overview/" },
        {title: "Senedd", path: "https://politics.tennessine.co.uk/uk/senedd-cymru-elections/overview/" }
    ];

    return ( <>
        <Header links={links} />
        {children}
    </> )
}