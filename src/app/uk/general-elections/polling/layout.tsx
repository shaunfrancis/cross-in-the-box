import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Opinion Polling'
  }

export default function UKPollingLayout( { children } : { children : React.ReactNode } ){
    return ( <>
        {children}
    </> )
}