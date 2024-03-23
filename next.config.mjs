/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    assetPrefix: process.env.NODE_ENV == 'development' ? '' : '/elections'
}
 
export default nextConfig