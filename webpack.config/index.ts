import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './base.config';
import devConfig from './dev.config';
import prodConfig from './prod.config';

const config: (env: { mode: string }) => Configuration = (env) => {
  const mode = env.mode;
  return merge(
    baseConfig(mode),
    mode === 'production' ? prodConfig : devConfig
  );
};

export default config;
