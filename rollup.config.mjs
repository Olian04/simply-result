import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input: './dist/main.js',
    output: [
      {
        file: './tmp/bundle.js',
        format: 'commonjs',
      },
    ],
    plugins: [
      commonjs(),
      terser(),
    ],
  },
];
