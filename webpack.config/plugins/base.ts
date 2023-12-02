import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { WebpackPluginInstance } from "webpack";
import WebpackBar from "webpackbar";
import Dotenv from "dotenv-webpack";

const basePlugins: WebpackPluginInstance[] = [
  new WebpackBar(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new MiniCssExtractPlugin(),
  new Dotenv(),
];

export default basePlugins;
