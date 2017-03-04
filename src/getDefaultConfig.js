import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { existsSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

function getBabelConfig() {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-node5'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-decorators-legacy'),
    ],
  };
}

export default function (args) {
  const pkgPath = join(args.cwd, 'package.json');
  const pkg = existsSync(pkgPath) ? require(pkgPath) : {};

  const babelQuery = getBabelConfig();

  return {
    babel: babelQuery,
    entry: {},
    output:{},
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          query: babelQuery,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(`${require.resolve('css-loader')}!${require.resolve('postcss-loader')}`, {
            publicPath: '../',
          }),
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          loader: `${require.resolve('url-loader')}?limit=1000&name=images/[name].[hash].[ext]`,
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: `${require.resolve('file-loader')}?name=fonts/[name].[hash].[ext]`,
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: `${require.resolve('url-loader')}?limit=1000`,
        },
        {
          test: /\.json$/,
          loader: `${require.resolve('json-loader')}`
        },
      ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'common.js',
        minChunks: Infinity
      }),
      new ExtractTextPlugin('common.css', {
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.BannerPlugin(
        pkg.name + ' v' + pkg.version
      ),
    ],
    externals: [/*{
      react: 'React',
    }, {
      'react-dom': 'ReactDOM',
    }*/],
    devtool: 'cheap-module-source-map',
    debug: args.debug || false,
    cache: args.cache || false,
    resolve: {
      modulesDirectories: ['node_modules', join(__dirname, '../node_modules')],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    },
    postcss: function plugin(bundler) {
      return [
        require.resolve('postcss-import')({
          addDependencyTo: bundler,
        }),
        require.resolve('precss')(),
        require.resolve('postcss-mixins')(),
        require.resolve('postcss-nested')(),
        require.resolve('postcss-cssnext')({
          autoprefixer: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 35',
            'Firefox >= 31',
            'Explorer >= 9',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 7.1',
          ],
        }),
      ];
    },
  };
}
