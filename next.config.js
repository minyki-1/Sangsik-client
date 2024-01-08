module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['yt3.ggpht.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};