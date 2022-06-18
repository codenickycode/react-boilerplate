import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackPluginInstance } from 'webpack';
import WebpackBar from 'webpackbar';

const basePlugins: WebpackPluginInstance[] = [
  new WebpackBar(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin(),
];

export default basePlugins;
