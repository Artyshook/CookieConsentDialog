import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// const packageJson = require("./package.json");
import packageJson from "./package.json" assert { type: "json" };


export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
                external: ['react', 'react-dom']
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
                external: ['react', 'react-dom']
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
        ],
        external: ['react', 'react-dom']

    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
];