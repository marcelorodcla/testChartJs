const webpack = require('webpack')
const path = require('path')
const dirApp = __dirname+'/'
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  const isDevelopment = !isProduction

  return {
    devtool: isDevelopment && 'cheap-module-source-map',
    entry: path.resolve('index.js'),
    output: {
      path: path.resolve(dirApp, 'dist'),
      filename: "js/app.js"
    },
    devServer: {
      port: 9000,
      hot: true,
      inline: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: '/node_modules/',
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { "targets": { "node": "10" } }]],
              envName: isProduction ? "production" : "development"
            }
          }
        }
      ]
    },
    // target: 'node',
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        )
      })
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        })
      ],
      // splitChunks: {
      //   chunks: "all",
      //   minSize: 0,
      //   maxInitialRequests: 10,
      //   maxAsyncRequests: 10,
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name(module, chunks, cacheGroupKey) {
      //         const packageName = module.context.match(
      //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/
      //         )[1];
      //         return `${cacheGroupKey}.${packageName.replace("@", "")}`;
      //       }
      //     },
      //     common: {
      //       minChunks: 2,
      //       priority: -10
      //     }
      //   }
      // },
      // runtimeChunk: "single"
    }
  }
}
