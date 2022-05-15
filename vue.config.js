module.exports = {
    pages: {
      index: {
        title: 'Erik Dietrich',
        entry: 'src/main'
      },
    },
    chainWebpack: config => {
      config.module
          .rule('vue')
          .use('vue-loader')
          .tap(options => {
              options.compiler = require('vue-template-babel-compiler')
              return options
          })
  }
  }