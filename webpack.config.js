var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        include: [SRC_DIR],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ]
            ]
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // This assumes your `config.js` file is in the `src` directory
      Config: path.resolve(__dirname, '/client/src/config.js'),
    }
  },
  devServer: {
    static: {
      directory: DIST_DIR,
    },
    compress: true,
    port: 3000
  }
};
