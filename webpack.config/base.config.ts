import path from 'path';
import { Configuration } from 'webpack';

import basePlugins from './plugins/base';
import assetRule from './rules/asset';
import cssRule from './rules/css';
import typescriptRule from './rules/typescript';

const baseConfig: Configuration = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: './',
  },
  plugins: basePlugins,
  module: {
    rules: [assetRule, cssRule, typescriptRule],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};

export default baseConfig;
