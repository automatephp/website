const Encore = require('@symfony/webpack-encore')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default
const Dotenv = require('dotenv-webpack')
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;

const routes = [
  '/doc',
  '/doc/deployment',
  '/doc/plugins',
  '/'
];

Encore
  .setOutputPath('dist/')
  .setPublicPath('/')
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  //.enableVersioning(Encore.isProduction()) // pas compatible github.io
  .enableVueLoader()
  .enableSassLoader()
  .addEntry('app', './src/main.js')
  .configureBabel(function(babelConfig) {
    babelConfig.presets.push('es2017','stage-2');
  })
  .addLoader(
    {
      test: /\.md$/,
      use: 'raw-loader'
    }
  )
  .addLoader(
    {
      test: /\.yaml$/,
      use: 'raw-loader'
    }
  )
  .addPlugin(new webpack.ProvidePlugin({
    "React": "react",
  }))
  .addPlugin(new HtmlWebpackPlugin({ filename: 'index.html', template: 'src/index.html'}))
  .addPlugin(new CopyWebpackPlugin([
    'static/demo.cast',
    'src/assets/favicon.ico',
    'src/404.html',
    'static/installer.php',
    'static/robots.txt',
    'static/sitemap.xml',
    'static/googleae5075fd86941943.html',
    '_redirects'
  ]))
  .addPlugin(new Dotenv({path: '.env'}))
;

const webpackConfig = Encore.getWebpackConfig();


if (Encore.isProduction()) {
  // Remove the old version first
  webpackConfig.plugins = webpackConfig.plugins.filter(
    plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin)
  );

  // Add the new one
  webpackConfig.plugins.push(new UglifyJsPlugin());
}

// export the final configuration
module.exports = webpackConfig;
