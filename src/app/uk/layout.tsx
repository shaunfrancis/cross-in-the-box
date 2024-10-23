import { Metadata } from "next";
import Header from "src/components/shared/Header/Header";

export const metadata: Metadata = {
    title: {
      template: '%s - United Kingdom - Cross In The Box',
      default: 'United Kingdom'
    },
    description: '',    
    icons: {
        icon: [
            { url: '/favicons/uk/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
            { url: '/favicons/uk/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicons/uk/favicon-16x16.png', sizes: '32x32', type: 'image/png' }
        ],
        apple: [ { url: '/favicons/uk/apple-touch-icon.png', sizes: '180x180' } ]
    },
    manifest: '/favicons/uk/site.webmanifest'
  }

export default function UKLayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "General Elections", path: "/uk/general-elections"},
        {title: "Scottish Parliament", path: "https://politics.tennessine.co.uk/uk/scottish-parliament-elections/overview/citb" },
        {title: "Senedd Cymru", path: "https://politics.tennessine.co.uk/uk/senedd-cymru-elections/overview/citb" }
    ];

    return ( <>
        <Header countryName="United Kingdom" countryAbbrev="uk" links={links} />
        {children}
    </> )
}