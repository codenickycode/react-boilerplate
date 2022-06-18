import { RuleSetUseItem } from 'webpack';

const postCssLoader: RuleSetUseItem = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer'],
    },
  },
};

export default postCssLoader;
