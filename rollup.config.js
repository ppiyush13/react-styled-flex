import commonJs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from "rollup-plugin-terser"
import pkg from './package.json'

export default [
    {
        input: 'src/index.js',
        output: [
            { file: pkg.module, format: 'esm', sourcemap: false},
            { file: pkg.main, format: 'cjs', sourcemap: false, exports: 'named', name: 'reactFlexbox'}
        ],
        external: Object.keys(pkg.peerDependencies),
        plugins: [
            babel({
                exclude: 'node_modules/**',
                compact: false,
                runtimeHelpers: false
            }),
            nodeResolve(),
            commonJs(),
            terser({
                sourcemap: false
            })
        ]
    }
]