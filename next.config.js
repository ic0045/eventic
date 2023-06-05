/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config
  },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/eventos',
          permanent: true,
        },
      ];
    },
}

module.exports = nextConfig
