import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  unstable_runtimeJS: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
     remotePatterns: [
      {
        protocol: 'http',
        hostname: 'srv673142.hstgr.cloud',
        // Remove the port specification or set it correctly
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
