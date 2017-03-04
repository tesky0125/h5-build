import webpack from 'webpack';
import { existsSync } from 'fs';
import { resolve } from 'path';
import getDefaultConfig from './getDefaultConfig';

function mergeCustomConfig(webpackConfig, customConfigPath, args) {
  if (!existsSync(customConfigPath)) {
    return webpackConfig;
  }

  const customConfig = require(customConfigPath);
  /* eslint prefer-rest-params:0 */
  if (typeof customConfig === 'function') {
    return {
      ...webpackConfig,
      ...customConfig(webpackConfig, args)/* override default config */
    }
  }

  throw new Error(`Return of ${customConfigPath} must be a function.`);
}

export default function(args) {
  let webpackConfig = getDefaultConfig(args);

  webpackConfig.plugins = webpackConfig.plugins || [];

  // if(args.verbose){
  //   webpackConfig.stats = {
  //     colors: args.verbose,
  //     reasons: args.verbose,
  //     hash: args.verbose,
  //     version: args.verbose,
  //     timings: args.verbose,
  //     chunks: args.verbose,
  //     chunkModules: args.verbose,
  //     cached: args.verbose,
  //     cachedAssets: args.verbose,
  //   };
  // }


  if (args.compress) {
    webpackConfig.plugins = [...webpackConfig.plugins,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      }),
    ];
  } else {
    if (process.env.NODE_ENV) {
      webpackConfig.plugins = [...webpackConfig.plugins,
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ];
    }
  }

  webpackConfig.plugins = [...webpackConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
  ];

  webpackConfig = mergeCustomConfig(webpackConfig, resolve(args.cwd, args.config || 'webpack.config.js'), args);

  return webpackConfig;
}
