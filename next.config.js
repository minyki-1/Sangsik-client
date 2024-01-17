module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['yt3.ggpht.com', 'cnowledge.s3.ap-northeast-2.amazonaws.com', 'lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};