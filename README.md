# tuoyingtao-applet 小程序启动模板

## 技术架构
### 开发环境
* Node:`14.14.0`
* npm: `6.14.8`
* Vue: `^2.6.11`
* VueX: `^3.2.0`
* node-sass: `^4.14.1`
* sass-loader: `^10.1.1`
* dayjs: `^1.11.7`
* `uview-ui`: `^2.0.35`
* uni-read-pages: `^1.0.5`
  @vue/cli 5.0.8
* postcss-loader、autoprefixer:（解决报错：`Error: PostCSS plugin autoprefixer requires PostCSS 8.·）
  `npm i postcss-loader autoprefixer@8.0.0`
* uniapp-weapp-starter-template
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目结构

```
uniapp-applet-starter-template
├── elemtn-ui -- 第三方UI组件
├── public -- 公用文件，不经过webpack处理	
├── src -- 核心模块
├	├── api -- 请求接口配置模块
├	├── common -- 公共css/js模块
├	├── components -- 公共组件模块
├	├── config -- 全局配置模块
├	├── enum -- 枚举模块
├	├── pages -- 小程序业务主包目录
├	├── pages_* -- 小程序业务分包目录
├	├── static -- 小程序主包静态文件
├	├── store -- vuex存储模块
├	├── utils -- 工具模块
├	├	└── request -- 请求工具模块
├	├── wxcomponents -- 小程序第三方组件模块
├	├── App.vue -- 项目入口文件
├	├── main.js -- 项目主入口
├	├── manifest.json -- uniapp 小程序配置应用名称、appid、logo、版本等打包信息，详见
├	├── pages.json -- 小程序配置页面路由、导航条、选项卡等页面类信息，详见
├	└── uni.scss -- uniapp 全局css样式
├── .gitignore -- git排除文件配置
├── package.json -- npm配置
├── package-lock.json -- npm配置锁文件
└── vue.config.js -- vue脚手架配置
```

## 关于vant-weapp组件

放在`wxcomponents`目录中的一切文件，无论是否使用，都会被打包。
整个 vant 所有组件体积为374k，可使用小程序的依赖分析查看

	考虑到体积优化问题，本仓库将完整的vant组件放在外层的 `/elemtn-ui/vant-weapp` 目录中。
	如需使用里面的组件，再自行Copy到 `/wxcomponents/vant/` 目录中


### 如何使用

例如使用 `<van-button>` 组件
1. 从 `/elemtn-ui/vant-weapp` 中复制 button 目录到 `/src/wxcomponents/vant/` 中
2. 在 `/src/page.json` 中配置
```json
"globalStyle": {
    "usingComponents": {
        "van-button": "/wxcomponents/vant/button/index",
    }
}
```
3. 检查该组件的依赖项有些组件依赖了`common/`下的js，有些组件则依赖了其他组件可通过该组件中的 `xxx.json` 查看，或直接看编译器提示这里`button`组件这里依赖了`loading`和`icon`组件，也需要一并移入并在`page.json`中配置 一般来说，这几个目录是所有组件都依赖的`common`、`wxs`、`mixins`。
4.  页面中使用 <van-button>按钮</van-button>
