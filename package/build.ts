import { $, build } from "bun";
import dts from "bun-plugin-dts";


await $`rm -rf dist`;

build({
    entrypoints: ["./src/index.ts"],
    outdir: "./dist",
    target: "browser",
    sourcemap: "external",
    format: "esm",
    external: [
        "react", 
        "react-dom",
        "react/jsx-runtime",
    ],
    banner: '"use client";',
    plugins: [
        dts({
            compilationOptions: {
                preferredConfigPath: "./tsconfig.app.json"
            },
            output: {
                exportReferencedTypes: false
            }
        })
    ]
});