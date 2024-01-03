const path = require('path')

module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['yt3.ggpht.com'],
  },
  // webpack(config, options) {
  //   config.resolve.alias['components'] = path.join(__dirname, 'components')
  //   return config
  // }
};