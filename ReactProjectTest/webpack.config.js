var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (mode, options) => {
  const isDevelopment = options.mode === "development";
  return {
    entry: {
      main: ["./src/Main.js"],
    },
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "./src"),
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: [["@babel/plugin-proposal-class-properties"]],
          },
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html", // 생성한 템플릿 파일
      }),
    ],
    devServer: {
      contentBase: "./public",
      host: "localhost",
      port: 8080,
      historyApiFallback: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
