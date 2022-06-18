import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetUseItem } from 'webpack';

const miniCssExtractLoader: RuleSetUseItem = {
  loader: MiniCssExtractPlugin.loader,
  options: { publicPath: '' }, // This is required for asset imports in CSS, such as url()
};

export default miniCssExtractLoader;
