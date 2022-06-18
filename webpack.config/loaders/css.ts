import { RuleSetUseItem } from 'webpack';

const localIdentName: string =
  process.env.NODE_ENV === 'production'
    ? '[hash:base64:6]'
    : '[path][name]__[local]';

const cssLoader: RuleSetUseItem = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMap: true,
    modules: {
      auto: true,
      exportOnlyLocals: false,
      localIdentName,
    },
  },
};

export default cssLoader;
