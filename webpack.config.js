const path = require("path");

module.exports = {
  entry: {
    app: "./public/assets/js/app.js",
  },
  output: {
    path: path.resolve(__dirname, ".public/assets/js/build"),
    filename: "main.bundle.js",
  },
  mode: "development",
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
