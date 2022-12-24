import path from 'path';
import { Configuration } from 'webpack';

import basePlugins from './plugins/base';
import imageRule from './rules/image';
import svgRule from './rules/svg';
import cssRule from './rules/css';
import typescriptRule from './rules/typescript';
import fontRule from './rules/font';

const baseConfig: (mode: string) => Configuration = (mode) => ({
  context: path.resolve(__dirname, '../'),
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: mode === 'production' ? './' : '/',
  },
  plugins: basePlugins,
  module: {
    rules: [fontRule, svgRule, imageRule, cssRule(mode), typescriptRule],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
});

export default baseConfig;
