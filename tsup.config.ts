import { defineConfig } from "tsup";

export default defineConfig({
    entry: [
        "packages/containers/src/index.ts",
        "packages/pattern-matching/src/index.ts",
        "packages/branded/src/index.ts"
    ],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
});