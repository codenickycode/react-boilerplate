import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './base.config';
import devConfig from './dev.config';
import prodConfig from './prod.config';

const config: Configuration = merge(
  baseConfig,
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

export default config;
