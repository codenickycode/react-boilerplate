import { RuleSetRule } from 'webpack';

const imageRule: RuleSetRule = {
  test: /\.(png|jpe?g|gif)$/i,
  type: 'asset',
  // parser: { dataUrlCondition: { maxSize: 1024 } },
};

export default imageRule;
