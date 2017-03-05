console.log('bundle cwd:',process.cwd())
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
// console.log('webpack+++',webpackConfig)

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    console.log('bundle ...')
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig.stats));
      return resolve();
    });
  });
}

module.exports = bundle;
