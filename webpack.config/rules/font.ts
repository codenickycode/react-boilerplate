import { RuleSetRule } from 'webpack';

const fontRule: RuleSetRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
};

export default fontRule;
