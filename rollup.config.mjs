// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
// import dts from "rollup-plugin-dts";
//
// // const packageJson = require("./package.json");
// import packageJson from "./package.json" assert { type: "json" };
//
//
// export default [
//     {
//         input: "src/index.ts",
//         output: [
//             {
//                 file: packageJson.main,
//                 format: "cjs",
//                 sourcemap: true,
//                 external: ['react', 'react-dom']
//             },
//             {
//                 file: packageJson.module,
//                 format: "esm",
//                 sourcemap: true,
//                 external: ['react', 'react-dom']
//             },
//         ],
//         plugins: [
//             resolve(),
//             commonjs(),
//             typescript({ tsconfig: "./tsconfig.json" }),
//         ],
//         external: ['react', 'react-dom']
//
//     },
//     {
//         input: "dist/esm/types/index.d.ts",
//         output: [{ file: "dist/index.d.ts", format: "esm" }],
//         plugins: [dts()],
//     },
// ];

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';



import packageJson from './package.json' assert { type: 'json' };
// export default [
//     {
//         input: 'src/index.ts',
//         output: [
//             {
//                 file: packageJson.main,
//                 format: 'cjs',
//                 sourcemap: true,
//             },
//             {
//                 file: packageJson.module,
//                 format: 'esm',
//                 sourcemap: true,
//             },
//         ],
//         plugins: [
//             resolve(),
//             commonjs(),
//             typescript({
//                 tsconfig: './tsconfig.json',
//                 // Remove the declaration and outDir options here
//             }),
//             css(), // Add the css plugin here
//         ],
//         external: ['react', 'react-dom'],
//     }
//     // Remove the second object that includes the dts plugin
// ];

import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";


export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            ignore(['**/__tests__', '**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx']),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                outDir: 'dist',
            }),

        ],
        external: ['react', 'react-dom'],
    },
    {
        input: 'dist/esm/types/index.d.ts', // Ensure this path is correct
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
    },
];
