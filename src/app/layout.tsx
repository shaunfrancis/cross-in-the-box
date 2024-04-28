import './style.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
    title: {
        template: '%s - Cross In The Box',
        default: 'Cross In The Box'
    },
    description: '',
    icons: {
        icon: [
            { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '32x32', type: 'image/png' }
        ],
        apple: [ { url: '/apple-touch-icon.png', sizes: '180x180' } ]
    },
    manifest: '/site.webmanifest'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
  }