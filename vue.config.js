const webpack = require('webpack');
const path = require('path');
const TransformPages = require("uni-read-pages");

function resolve(dir) {
  return path.join(__dirname, dir)
}

const tfPages = new TransformPages();
const plugins = [];
/** 读取pages.json，注入页面配置到js全局变量 ROUTES 中 */
plugins.push(new tfPages.webpack.DefinePlugin({
  ROUTES: JSON.stringify(tfPages.routes),
}))

/** 打包依赖分析 */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
if (process.env.ANALYZER) {
  console.log('已启动打包依赖分析，请确保端口8888未被占用');
  plugins.push(new BundleAnalyzerPlugin({
    //  可以是`server`，`static`或`disabled`。
    //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
    //  在“静态”模式下，会生成带有报告的单个HTML文件。
    //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
    analyzerMode: 'server',
    //  将在“服务器”模式下使用的主机启动HTTP服务器。
    analyzerHost: '127.0.0.1',
    //  将在“服务器”模式下使用的端口启动HTTP服务器。
    analyzerPort: 8888,
    //  路径捆绑，将在`static`模式下生成的报告文件。
    //  相对于捆绑输出目录。
    reportFilename: 'report.html',
    //  模块大小默认显示在报告中。
    //  应该是`stat`，`parsed`或者`gzip`中的一个。
    defaultSizes: 'parsed',
    //  在默认浏览器中自动打开报告
    openAnalyzer: true,
    //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
    generateStatsFile: false,
    //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
    //  相对于捆绑输出目录。
    statsFilename: 'stats.json',
    //  stats.toJson（）方法的选项。
    //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
    //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    statsOptions: null,
    logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
  }))
}

const manifestFileHandler = (callback, isWrite = false) => {
  const fs = require('fs');
  const manifestPath = './src/manifest.json';
  let manifestJson = fs.readFileSync(manifestPath, { encoding: 'UTF-8' });
  const replaceManifest = (path, value) => {
    const arr = path.split('.')
    const len = arr.length
    const lastItem = arr[len - 1]
    let i = 0
    let manifestArr = manifestJson.split(/\n/)
    for (let index = 0; index < manifestArr.length; index++) {
      const item = manifestArr[index]
      if (new RegExp(`"${arr[i]}"`).test(item)) ++i
      if (i === len) {
        const hasComma = /,/.test(item)
        manifestArr[index] = item.replace(
          new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
          `"${lastItem}" : ${value}${hasComma ? ',' : ''}`
        )
        break;
      }
    }
    manifestJson = manifestArr.join('\n')
  }
  callback(replaceManifest);
  // console.log(manifestJson);
  if (isWrite) {
    fs.writeFileSync(manifestPath, manifestJson, {
      flag: 'w'
    })
  }
}

module.exports = {
  transpileDependencies: ['uview-ui'],
  // 用于放置生成的静态资源 (js、css、img、fonts) 不可更改
  assetsDir: 'static',
  // 测试环境配置跨域，正式环境（服务端或app端无需配置跨域，或让后端配置）忽略此配置
  // 测试环境配置根域名为/api/xxx（接口名称）
  // 生产环境根域名直接为http://localhost:8080（后端地址）即可
  devServer: {
    proxy: {
      [process.env.API_BASE_URL]: {
        target: `http://localhost:4003`,
        ws: true,
        changeOrigin: true,
        secure:false,
        pathRewrite: {
          ['^' + process.env.API_BASE_URL]: ''
        }
      }
    },
    disableHostCheck: true
  },
  // chainWebpack 通过链式编程的形式，来修改默认的 webpack 配置(更细粒度的配置)
  chainWebpack: (config) => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
      const compress = args[0].terserOptions.compress;
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true;
      compress.pure_funcs = [
        '__f__', // App 平台 vue 移除日志代码
        'console.debug', // 可移除指定的 console 方法
      ];
      return args;
    }),
    //根据环境设置相关变量
    config.plugin('define').tap(args => {
      const BASE_DEV = require('./src/config/config');
      Object.keys(BASE_DEV).forEach(key => BASE_DEV[key] = `"${BASE_DEV[key]}"`)
      args[0]['process.env'] = Object.assign({}, args[0]['process.env'], BASE_DEV);
      args[0]['process.env'].VUE_APP_NAME = `"${require('./package.json').name}"`;
      args[0]['process.env'].APP_VERSION = `"${require('./package.json').version}"`;
      manifestFileHandler(function (replaceManifest) {
        replaceManifest('name', `${args[0]['process.env'].VUE_APP_NAME}`);
        replaceManifest('appid', `${args[0]['process.env'].APPLET_APPID}`);
        replaceManifest('versionName', `${args[0]['process.env'].APP_VERSION}`);
        replaceManifest('mp-weixin.appid', `${args[0]['process.env'].APPLET_APPID}`);
        replaceManifest('mp-weixin.uniStatistics.enable', 'true');
        replaceManifest('mp-weixin.debug', args[0]['process.env'].VUE_APP_DEBUG == '"true"' ? 'true' : 'false');
      }, true);
      return args
    })
  },
  // configureWebpack 通过操作对象的形式，来修改默认的 webpack 配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 打包build的时候去掉console的调试信息
      config.optimization.minimizer = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true, //console
              drop_debugger: true,
              pure_funcs: ['console.log'] //移除console
            }
          }
        })
      ]
      //打包文件大小配置
      config["performance"] = {
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  configureWebpack: {
    name: process.env.VUE_APP_NAME,
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    plugins,
  },
}
