const fs = require('fs-extra');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractChunksPlugin = require('extract-css-chunks-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackStartServerPlugin = require('start-server-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const paths = require('./scripts/configs/path');
const logger = require('./scripts/utils/logger');
const { getEnvironmentVariables } = require('./scripts/configs/env'); // eslint-disable-line

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
    modify,
  },
  customWebpack,
) => {
  const IS_WEB = target === 'web';
  const IS_NODE = target === 'node';
  const IS_DEV = env === 'dev';
  const IS_PROD = env === 'prod';

  const publicPath = IS_PROD ? '/' : '/__WDS__/';
  const dotenv = getEnvironmentVariables(target);

  const hasBabelRc = fs.existsSync(paths.appBabelRc);
  if (!hasBabelRc) {
    // TODO: Add predefined .babelrc
  } else if (hasBabelRc && IS_NODE) {
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
            publicPath,
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
      minimizer: IS_DEV
        ? []
        : [
          new TerserJSPlugin({}),
          new OptimizeCSSAssetsPlugin({}),
        ],
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
      {
        test: /\.less$/,
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
            loader: 'less-loader',
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

    config.plugins = [
      new webpack.DefinePlugin(dotenv.stringified),
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
              modules: false,
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
              modules: false,
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
      {
        test: /\.less$/,
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
              modules: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
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
      new ExtractChunksPlugin({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[name].css',
        cssModules: true,
        orderWarning: true,
        hot: IS_DEV,
        reloadAll: IS_DEV,
      }),
    ];

    if (IS_DEV) {
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

      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin(dotenv.stringified),
      ];
    } else {
      config.entry = {
        client: [
          paths.appClientIndex,
        ],
      };

      config.output = {
        path: paths.appDist,
        publicPath: '/',
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        libraryTarget: 'var',
      };
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

  // Check if rift.config has a modify function. If it does, call it on the
  // configs we created.
  if (modify) {
    config = modify(config, { target, dev: IS_DEV }, customWebpack);
  }

  return config;
};
