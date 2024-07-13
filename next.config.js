/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    // experimental:{
    //     esmExternals: false,
    // },
    // typescript:{
    //     ignoreBuildErrors:true
    //   }
};

module.exports = nextConfig;
