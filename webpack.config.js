const fs = require('fs-extra');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractChunksPlugin = require('extract-css-chunks-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackStartServerPlugin = require('start-server-webpack-plugin');
const paths = require('./scripts/configs/path');
const logger = require('./scripts/utils/logger');


const publicPath = '/__WDS__/';
const postCssOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};

module.exports = (
  target = 'web',
  env = 'dev',
  // Rift config
  {
    host = 'localhost',
    port = 3000,
    // modify,
    // plugins,
    // modifyBabelOptions,
  },
  customWebpack,
) => {
  const IS_WEB = target === 'web';
  const IS_NODE = target === 'node';
  const IS_DEV = env === 'dev';
  // const IS_PROD = env === 'prod';

  const hasBabelRc = fs.existsSync(paths.appBabelRc);
  // const mainBabelOptions = {
  //   babelrc: true,
  //   cacheDirectory: true,
  //   presets: [],
  // };
  if (!hasBabelRc) {
    // TODO : Add predefined .babelrc
  }

  if (hasBabelRc && IS_NODE) {
    logger('log', 'Using .babelrc defined in your app');
  }

  let config = {
    mode: IS_DEV ? 'development' : 'production',
    context: process.cwd(),
    target,
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    devtool: IS_DEV ? 'cheap-module-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              cacheDirectory: true,
            },
          },
        },
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx|mjs)$/,
            /\.(ts|tsx)$/,
            /\.(vue)$/,
            /\.(less)$/,
            /\.(re)$/,
            /\.(s?css|sass)$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
          ],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
            emitFile: true,
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
            emitFile: true,
          },
        },
      ],
    },
    plugins: [],
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-',
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
        },
      },
    },
  };

  if (IS_NODE) {
    config.node = {
      __console: false,
      __dirname: false,
      __filename: false,
    };

    config.entry = [
      paths.appServerIndex,
    ];

    config.output = {
      path: paths.appDist,
      filename: 'server.js',
      libraryTarget: 'commonjs2',
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssOptions,
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssOptions,
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ];

    config.externals = [
      '@loadable/component',
      nodeExternals({
        whitelist: [
          'webpack/hot/poll?1000',
          /\.(eot|woff|woff2|ttf|otf)$/,
          /\.(svg|png|jpg|jpeg|gif|ico)$/,
          /\.(mp4|mp3|ogg|swf|webp)$/,
          /\.(css|scss|sass|sss|less)$/,
        ].filter(x => x),
      }),
    ];

    if (IS_NODE && IS_DEV) {
      config.watch = true;

      config.entry.unshift('webpack/hot/poll?1000');

      config.plugins = [
        ...config.plugins,
        new WebpackStartServerPlugin({ name: 'server.js' }),
      ];
    }
  }

  if (IS_WEB) {
    config.output = {
      path: paths.appDist,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    };
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractChunksPlugin.loader,
            options: {
              publicPath,
              hot: true,
              reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssOptions,
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: ExtractChunksPlugin.loader,
            options: {
              publicPath,
              hot: true,
              reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ];

    config.plugins = [
      ...config.plugins,
      new AssetsPlugin({
        path: paths.appDist,
        filename: 'assets.json',
      }),
    ];

    if (IS_WEB && IS_DEV) {
      config.entry = {
        client: [
          'react-hot-loader/patch',
          `webpack-dev-server/client?${publicPath}`,
          'webpack/hot/only-dev-server',
          paths.appClientIndex,
        ],
      };
      config.output.publicPath = publicPath;

      config.devServer = {
        host,
        port: port + 1,
        compress: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        hot: true,
        stats: { colors: true, children: false },
        quiet: true,
        noInfo: true,
        overlay: {
          errors: true,
          warnings: true,
        },
        disableHostCheck: true,
        clientLogLevel: 'none',
      };

      config.plugins.push(
        new ExtractChunksPlugin({
          filename: '[name].css',
          chunkFilename: '[name].css',
          cssModules: true,
          hot: true,
          orderWarning: true,
          reloadAll: true,
        }),
      );
    }
  }

  if (IS_DEV) {
    config.plugins = [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.WatchIgnorePlugin([paths.appAssetsManifest]),
    ];
  }

  if (customWebpack) {
    config = {
      ...config,
      ...customWebpack,
    };
  }

  return config;
};
