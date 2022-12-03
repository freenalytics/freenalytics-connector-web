import external from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const inputFile = './src/index.ts';
const externalDeps = ['cross-fetch', 'cross-fetch/polyfill'];

const babelOptions = {
  exclude: 'node_modules/**',
  babelHelpers: 'bundled'
};

const moduleName = 'freenalytics';

const plugins = [
  external(),
  typescript(),
  babel(babelOptions),
  resolve()
];

export default [
  {
    input: inputFile,
    external: externalDeps,
    plugins: [
      ...plugins,
      terser()
    ],
    output: [
      {
        file: './dist/connector.min.js',
        format: 'umd',
        name: moduleName,
        esModule: false,
        exports: 'named',
        sourcemap: false
      }
    ]
  },
  {
    input: inputFile,
    external: externalDeps,
    plugins,
    output: [
      {
        file: './dist/connector.js',
        format: 'umd',
        name: moduleName,
        esModule: false,
        exports: 'named',
        sourcemap: false
      }
    ]
  }
];
