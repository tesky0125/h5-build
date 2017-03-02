import { tmpdir } from 'os';

export default function () {
  return {
    cacheDirectory: tmpdir(),
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-node5'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-decorators-legacy'),
    ],
  };
}
