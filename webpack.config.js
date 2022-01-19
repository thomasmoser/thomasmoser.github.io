const path = require("path");

module.exports = {
  entry: {
    app: "./assets/js/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./assets/js/build"),
    filename: "main.bundle.js",
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: "/views/landing.html" }],
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
