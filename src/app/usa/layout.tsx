import { Metadata } from "next";
import Header from "src/components/shared/Header/Header";

export const metadata: Metadata = {
    title: {
      template: '%s - United States - Cross In The Box',
      default: 'United States'
    },
    description: '',
  }

export default function USALayout( { children } : { children : React.ReactNode } ){
    const links = [
        {title: "President", path: "/usa/presidential-elections"},
        {title: "Senate", path: "/usa/senate-elections" },
        {title: "House", path: "/usa/house-elections" },
        {title: "Governor", path: "/usa/gubernatorial-elections" }
    ];

    return ( <>
        <Header country="United States" links={links} />
        {children}
    </> )
}