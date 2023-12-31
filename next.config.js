module.exports = (phase, { defaultConfig }) => {
  if ('sassOptions' in defaultConfig) {
    defaultConfig['sassOptions'] = {
      includePaths: ['./src'],
      prependData: `@import '~@styles/colors.scss';`,
    }
  }
  return {
    ...defaultConfig,
    swcMinify: true,
    reactStrictMode: true,
  };
};