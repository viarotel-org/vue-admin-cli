const path = require("path");
const rimraf = require("rimraf");
const resolve = (dir) => path.join(__dirname, dir);
const devServerConfig = require("./src/config/devServer");
const pageConfig = require("./src/config");
const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";
const port = devServerConfig.port || 8000;
isDevelopment &&
  rimraf(resolve("./dist"), (err) => {
    if (err) throw err;
  });

module.exports = {
  publicPath: isProduction ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: isProduction, // 生产环境时禁用定位源码
  filenameHashing: isProduction, // 生产环境时开启文件哈希值,
  devServer: {
    // 环境配置
    port,
    hot: true, // false防止开发模式白屏(使用路由缓存时)
    open: false, // 编译完成后打开浏览器
    proxy: {
      /** 解决本地测试跨域问题 */
      [`/${devServerConfig.apiRoot}`]: {
        target: devServerConfig.proxyUrl,
        pathRewrite: {
          [`^/${devServerConfig.apiRoot}`]: "",
        },
      },
    },
  },
  //指定需要编译的依赖
  transpileDependencies: [
    // "vuetify",
    // "lottie-player-vue",
    // "vue-awesome-swiper",
    // "vue-tippy",
    // "axios-apicloud-adapter",
    // "vue-screen"
  ],

  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(isProduction, (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-plus(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: pageConfig.title,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },

  css: {
    loaderOptions: {
      // sass: {
      //   prependData: `@import "~@/assets/css/vuetify-custom.scss"`,
      // },
      scss: {
        // prependData: `@import "~@/assets/css/vuetify-custom.scss";`,
        prependData: Object.keys(pageConfig.theme)
          .map((key) => `${key}: ${pageConfig.theme[key]};`)
          .join("\n"),
      },
    },
  },
};
