import { RuleSetRule } from 'webpack';

const assetRule: RuleSetRule = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset',
  // parser: { dataUrlCondition: { maxSize: 1024 } },
};

export default assetRule;
