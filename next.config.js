const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // any configs you need
}
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
module.exports = (phase, { defaultConfig }) => {
  if ('sassOptions' in defaultConfig) {
    defaultConfig['sassOptions'] = {
      includePaths: ['./src'],
      prependData: `@import "~@styles/variables.scss";`,
    }
  }
  return defaultConfig
}
module.exports = withCSS(withSass())
module.exports = withBundleAnalyzer(nextConfig)
