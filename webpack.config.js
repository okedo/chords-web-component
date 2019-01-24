const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  let config;
  const production = {
    entry: "./src/index.js",
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6
          }
        })
      ]
    },
    output: {
      filename: "chord.js",
      path: path.resolve(__dirname, "build")
    },
    plugins: [new CleanWebpackPlugin(["dist"])]
  };

  const development = {
    devServer: {
      contentBase: path.join(__dirname, "./"),
      port: 9000
    },
    entry: "./src/index.js",
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: "chord.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new HtmlWebpackPlugin({
        template: "./example.html"
      }),
      new BrowserSyncPlugin({
        host: "localhost",
        port: 3000,
        server: { baseDir: ["./dist/"] }
      })
    ],
    devServer: {
      contentBase: "./"
    }
  };
  if (argv.mode === "development") {
    config = development;
  }

  if (argv.mode === "production") {
    config = production;
  }

  return config;
};
