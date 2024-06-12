import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    name: '@hushibul/mongo-utils',
  },
  external: ['mongodb'],
  plugins: [typescript({ tsconfig: 'tsconfig.json' })],
});
