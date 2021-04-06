import dts from "rollup-plugin-dts";
import pkg from './rollup.load-package-json.cjs';

export default [
    {
        input: pkg.source,
        output: [
            {
                file: pkg.types,
                format: "es",
            }
        ],
        plugins: [
            dts(),
        ],
    },
];
