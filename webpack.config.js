const Encore = require('@symfony/webpack-encore')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')


Encore
  .setOutputPath('dist/')
  .setPublicPath('/')
  .cleanupOutputBeforeBuild()
  .enableSingleRuntimeChunk()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .enableVueLoader()
  .enableSassLoader()
  .addEntry('app', './src/main.js')
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


module.exports = webpackConfig;
