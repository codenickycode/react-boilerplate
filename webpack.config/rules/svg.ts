import { RuleSetRule } from 'webpack';

const svgRule: RuleSetRule = {
  test: /\.svg$/i,
  use: ['@svgr/webpack'],
};

export default svgRule;
