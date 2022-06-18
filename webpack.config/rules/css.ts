import { RuleSetRule } from 'webpack';
import cssLoader from '../loaders/css';
import miniCssExtractLoader from '../loaders/mini-css-extract';
import postCssLoader from '../loaders/postcss';

const cssRule: (mode: string) => RuleSetRule = (mode) => ({
  test: /\.css$/i,
  use: [
    mode === 'production' ? miniCssExtractLoader : 'style-loader',
    cssLoader(mode),
    postCssLoader,
  ],
});

export default cssRule;
