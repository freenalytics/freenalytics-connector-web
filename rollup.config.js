import external from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.ts',
    plugins: [
      external(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      resolve(),
      terser()
    ],
    output: [
      {
        file: './dist/connector.min.js',
        format: 'umd',
        name: 'freenalytics',
        esModule: false,
        exports: 'named',
        sourcemap: false
      }
    ]
  },
  {
    input: './src/index.ts',
    plugins: [
      external(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      resolve()
    ],
    output: [
      {
        file: './dist/connector.js',
        format: 'umd',
        name: 'freenalytics',
        esModule: false,
        exports: 'named',
        sourcemap: false
      }
    ]
  }
];
