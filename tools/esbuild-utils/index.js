module.exports = {
  esbuild: require("esbuild"),
  AliasPlugin: require("./plugins/alias"),
  CopyPlugin: require("./plugins/copy"),
  NodeExternalsPlugin: require("./plugins/nodeExternals"),
  StripFlowPlugin: require("esbuild-plugin-flow"),
  HtmlPlugin: require("@craftamap/esbuild-plugin-html").htmlPlugin,
  ...require("./externals"),
};
