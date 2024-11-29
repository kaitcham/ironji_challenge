import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'assets-global.website-files.com' },
    ],
  },
  sassOptions: {
    implementation: 'sass',
    includeCss: true,
  },
};

export default nextConfig;
