const {
  AliasPlugin,
  HtmlPlugin,
  electronRendererExternals,
  nodeExternals,
} = require("esbuild-utils");
const common = require("./common.esbuild");
const path = require("path");

module.exports = {
  ...common,
  entryPoints: ["src/renderer/index.js"],
  entryNames: "renderer.bundle",
  platform: "node",
  target: ["chrome91"],
  format: "iife",
  external: [
    ...nodeExternals.filter(external => !external.startsWith("buffer")),
    ...electronRendererExternals,
  ],
  resolveExtensions: process.env.V3
    ? [".v3.tsx", ".v3.ts", ".v3.jsx", ".v3.js", ".tsx", ".ts", ".jsx", ".js", ".json"]
    : [".jsx", ".js", ".v3.tsx", ".v3.ts", ".v3.jsx", ".v3.js", ".tsx", ".ts", ".json"],
  plugins: [
    ...common.plugins,
    AliasPlugin({
      // See: https://github.com/facebook/react/issues/20235
      // "react/jsx-runtime": "react/jsx-runtime.js",
      // Alias react-ui and icons-ui peer dependencies to prevent duplicate packages issues.
      react: [require.resolve("react"), path.dirname(require.resolve("react"))],
      // "react-dom": [require.resolve("react-dom"), path.dirname(require.resolve("react-dom"))],
      // "styled-system": [
      //   require.resolve("styled-system"),
      //   path.dirname(require.resolve("styled-system")),
      // ],
      // "styled-components": [
      //   require.resolve("styled-components"),
      //   path.dirname(require.resolve("styled-components")),
      // ],
    }),
    HtmlPlugin({
      files: [
        {
          entryPoints: ["src/renderer/index.js", "renderer.bundle.css"],
          htmlTemplate: "src/renderer/index.html",
          filename: "index.html",
          title: "Ledger Live",
        },
      ],
    }),
    // {
    //   name: "Side Effects",
    //   setup(build) {
    //     build.onResolve({ filter: /\.woff2$/ }, async args => {
    //       if (args.importer.endsWith("libs/ui/packages/react/lib/assets/fonts.js")) {
    //         console.log(args.path);
    //         return {
    //           sideEffects: true,
    //         };
    //       }
    //     });
    //   },
    // },
  ],
};
