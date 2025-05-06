import { Metadata } from "next";
import Header from "src/components/shared/Header/Header";

export const metadata: Metadata = {
    title: {
      template: '%s - Vatican City - Cross In The Box',
      default: 'Vatican City'
    },
    description: '',    
    icons: {
        icon: [
            { url: '/favicons/vatican-city/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicons/vatican-city/favicon-48x48.png', sizes: '48x48', type: 'image/png' }
        ],
        apple: [ { url: '/favicons/vatican-city/apple-touch-icon.png', sizes: '180x180' } ]
    },
    manifest: '/favicons/vatican-city/site.webmanifest'
  }

export default function VaticanLayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "Papal Conclaves", path: "/vatican-city/papal-conclaves"},
    ];

    return ( <>
        <Header countryName="Vatican City" countryAbbrev="vatican-city" links={links} />
        {children}
    </> )
}