import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

export default [
  // browser-friendly UMD build
  {
    input: "src/main.ts",
    output: {
      name: "@artikool5/react-responsive",
      file: pkg.browser,
      format: "umd",
      globals: {
        react: "React",
        "react/jsx-runtime": "jsxRuntime",
      },
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    external: ["react", "react/jsx-runtime"],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/main.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    external: ["react", "react/jsx-runtime"],
  },
];
