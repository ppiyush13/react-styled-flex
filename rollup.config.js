import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';
import pkg from './package.json';

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: pkg.module,
                format: 'esm',
				sourcemap: true,
            },
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
                name: 'reactFlexbox',
            },
        ],
        external: Object.keys(pkg.peerDependencies),
        plugins: [
			sourcemaps(),
            nodeResolve(),
            babel({
                babelHelpers: 'bundled',
                skipBabelHelpersCheck: true,
                exclude: 'node_modules/**',
                compact: false,
            }),
            commonJs(),
            terser({
                sourcemap: true,
            }),
        ],
    },
];
