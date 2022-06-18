import { RuleSetRule } from 'webpack';

const typescriptRule: RuleSetRule = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'swc-loader',
    options: {
      sourceMaps: true,
    },
  },
};

export default typescriptRule;
