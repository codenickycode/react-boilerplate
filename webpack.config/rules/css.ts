import { RuleSetRule } from 'webpack';

import cssLoader from '../loaders/css';
import miniCssExtractLoader from '../loaders/mini-css-extract';
import postCssLoader from '../loaders/postcss';

/** Build the CSS files. */
const cssRule: RuleSetRule = {
  test: /\.css$/i,
  use: [
    process.env.NODE_ENV === 'production'
      ? miniCssExtractLoader
      : 'style-loader',
    cssLoader,
    postCssLoader,
  ],
};

export default cssRule;
