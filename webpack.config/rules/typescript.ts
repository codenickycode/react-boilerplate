import { RuleSetRule } from 'webpack';

/** Build TypeScript / TypeScriptReact files with SWC. */
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
