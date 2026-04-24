module.exports = {
  pages: {
    index: {
      title: "Erik Dietrich",
      entry: "src/main",
    },
  },
  transpileDependencies: ["html2pdf.js", "html2canvas", "fast-png", "iobuffer"],
  pwa: {
    name: "Erik Portfolio",
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = require("vue-template-babel-compiler");
        return options;
      });
  },
};
