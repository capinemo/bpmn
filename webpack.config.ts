import * as path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/bpmn.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundled.js',
  },
  devtool: 'source-map',
};

export default config;

