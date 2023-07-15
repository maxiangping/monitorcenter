const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function addStyleResource (rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
            // 需要全局导入的less
            path.resolve(__dirname, './src/assets/less/normalize.less'),
            path.resolve(__dirname, './src/assets/less/common.less'),
            ]
        })
}
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  /** 区分打包环境与开发环境
    * process.env.NODE_ENV==='production' (打包环境)
    * process.env.NODE_ENV==='development' (开发环境)
    * publicPath: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
    */
    // publicPath: '/zmshop',
    publicPath: "/", // 构建好的文件输出到哪里
    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    assetsDir: 'assets',
    indexPath: "index.html",
    lintOnSave: false, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only

    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    pages: {
        index: {
        // entry for the pages
        entry: 'src/main.js',
        // the source template
        // template: 'src/template/index.html',
        // output as dist/index.html
        // filename: 'index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: '首页',
        // chunks to include on this pages, by default includes
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: ''
    },

    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md

    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets',resolve('src/assets'))
    },

    configureWebpack: () => {}, // CSS 相关选项

    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）

        extract: true, // 允许生成 CSS source maps?

        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }

        loaderOptions: {
            less: {
                javascriptEnabled: true //less 配置
            }
        }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.

        // modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    pwa: {}, // configure webpack-dev-server behavior

    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://zm-api.caoyanyan.work',
                secure: false,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }

    }, // 第三方插件配置

    pluginOptions: {
    // ...
    },
})
