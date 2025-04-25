import { Metadata } from "next";
import Header from "src/components/shared/Header/Header";

export const metadata: Metadata = {
    title: {
      template: '%s - Canada - Cross In The Box',
      default: 'Canada'
    },
    description: '',    
    icons: {
        icon: [
            { url: '/favicons/canada/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicons/canada/favicon-48x48.png', sizes: '48x48', type: 'image/png' }
        ],
        apple: [ { url: '/favicons/canada/apple-touch-icon.png', sizes: '180x180' } ]
    },
    manifest: '/favicons/canada/site.webmanifest'
  }

export default function CanadaLayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "Federal Elections", path: "/canada/federal-elections"},
    ];

    return ( <>
        <Header countryName="Canada" countryAbbrev="canada" links={links} />
        {children}
    </> )
}