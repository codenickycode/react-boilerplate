import { RuleSetUseItem } from 'webpack';

const cssLoader: (mode: string) => RuleSetUseItem = (mode) => ({
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMap: true,
    modules: {
      auto: true,
      exportOnlyLocals: false,
      localIdentName:
        mode === 'production' ? '[hash:base64:6]' : '[path][name]__[local]',
    },
  },
});

export default cssLoader;
