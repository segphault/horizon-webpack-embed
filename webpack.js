'use strict';

const webpack = require("webpack");
const compiler = webpack({
  context: __dirname,
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    "./client.jsx"
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "#source-map",
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders:[
          "react-hot",
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-2,plugins[]=transform-runtime'
        ]
      }
    ]
  }
});

module.exports = function(app) {
  app.use(require("koa-webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: "/"
  }));

  app.use(function*(next) {
    yield require("webpack-hot-middleware")(compiler, {
      log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }).bind(null, this.req, this.res);

    yield next;
  });
};
