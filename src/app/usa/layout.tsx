import { Metadata } from "next";
import Header from "src/components/shared/Header/Header";

export const metadata: Metadata = {
    title: {
      template: '%s - United States - Cross In The Box',
      default: 'United States'
    },
    description: '',
    icons: {
        icon: [
            { url: '/favicons/usa/favicon-48x48.png', sizes: '48x48', type: 'image/png' }
        ],
        apple: [ { url: '/favicons/usa/apple-touch-icon.png', sizes: '192x192' } ]
    },
    manifest: '/favicons/usa/site.webmanifest'
  }

export default function USALayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "President", path: "/usa/presidential-elections"},
        {title: "Senate", path: "/usa/senate-elections" },
        {title: "House", path: "/usa/house-elections" },
        {title: "Governor", path: "/usa/gubernatorial-elections" }
    ];

    return ( <>
        <Header countryName="United States" countryAbbrev="usa" links={links} />
        {children}
    </> )
}