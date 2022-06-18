import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import basePlugins from './plugins/base';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const devConfig: Configuration = {
  mode: 'development',
  plugins: [...basePlugins, new ReactRefreshWebpackPlugin()],
  stats: 'minimal',
  devServer: {
    port: 3003,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  // this prevents hang on exit
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
};

export default devConfig;
