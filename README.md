# tuoyingtao-applet-starter-template 小程序启动模板

## 技术架构
### 开发环境
* Node:`14.14.0`
* npm: `6.14.8`
* Vue: `^2.6.11`
* VueX: `^3.2.0`
* node-sass: `^4.14.1`
* sass-loader: `^10.1.1`
* dayjs: `^1.11.7`
* uview-ui: `^2.0.35`
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
tuoyingtao-applet-starter-template
├── elemtn-ui -- 第三方UI组件
├── public -- 公用文件，不经过webpack处理	
├── src -- 核心模块
├	├── api -- 请求接口配置模块
├	├── common -- 公共css/js模块
├	├── components -- 公共组件模块
├	├── config -- 全局配置模块
├	├── enum -- 枚举模块
├	├── event -- 监听事件模块
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

## 使用必读

### 全局环境配置

在 Config 文件夹下的`config.js`中配置请求域名地址、不同平台的小程序 APPID 以及 COS 云存储对象地址。最终`config.js`对外暴露的的只有`GLOBAL_CONFIG`对象，而`GLOBAL_CONFIG`对象下的所有属性都将加入到应用环境中（`process.env`）。

* `APPLET_MAP`小程序各平台的AppID。
* `COS_DATA`云存储对象桶与地域信息配置。
* `REQUEST_PATH`请求域名地址。
* `UNI_STATISTICS`是否开启uni统计。
* `OPTIMIZATION`分包优化。

`process.env`下的所有属性包含上面的那几个：

* `VUE_APP_NAME`：应用程序名称（取自`package.json`下的`name`）。
* `APP_VERSION`：应用程序版本号（取自`package.json`下的`version`）。
* `VUE_APP_PLATFORM`：当前是那个平台的小程序。
* `NODE_ENV`：当前应用环境。
* `VUE_APP_DEBUG`：DEBUG 模式启动。
* `API_BASE_URL`：域名地址。
* `APPLET_APPID`：小程序APPID。
* `BASE_URL`：默认API。
* `PREVIEW_PICTURE_URL`：COS 云存储对象域名。
* `VUE_APP_DARK_MODE`：暗黑模式也被称为夜间模式或深色模式。（在框架中不做任何处理，对暗黑模式感兴趣的请前往[官网介绍](https://zh.uniapp.dcloud.io/tutorial/darkmode.html)）

```js
// 使用方式
process.env.VUE_APP_NAME
```

### 枚举类的使用方式

**前言**：在项目开发过程中通常会有多种状态类型处理，我们会大量的使用【0，1】作为状态的标识，如果项目体系较大会导致我们在维护阅读时成本提高。

为解决这个问题，我在本框架中自定义了一个`Enum.js`（枚举类）以及`GlobalEnums.js`（枚举实现工具）作为全局枚举统一管理。

* `Enum.js`类中提供`getEnumInstance(definition)`静态方法用于初始化枚举对象，接收的参数为对象。
  * `definition`：参数对象的值为数组
  * `getValue(enumKey)`：`enumKey`枚举属性名称，返回枚举状态Value值。
  * `getDescMessage(enumValue)`：`enumValue`枚举状态Value值，返回枚举详情信息。

* `GlobalEnums.js`引入了`Enum.js`所有在开发的过程中我们只需要通过`Enum.getEnumInstance(definition)`来创建我们的枚举实现工具。

  ```js
  export const NaiveCardEnum = Enum.getEnumInstance({
    PATH_PAGE: [1, "页面路径"],
    PATH_APPLET: [2, "小程序路径"],
  });
  ```

在项目业务逻辑中使用方式：

```js
/** 获取枚举状态值 */
NaiveCardEnum.PATH_PAGE // 1
NaiveCardEnum.getValue('PATH_PAGE') // 1

/** 获取枚举状态值 */
NaiveCardEnum.getDescMessage(status) // 页面路径

let status = 1;
if (NaiveCardEnum.PATH_PAGE == status) // true
```

**注意事项：**

BUG：`definition`属性名尽量不要同名，这会导致同名属性值被覆盖。（有解决方案的小伙伴还请 Issues）

```js
// 错误案例
export const NaiveCardEnum = Enum.getEnumInstance({
  PATH_PAGE: [1, "页面路径"],
  PATH_APPLET: [2, "小程序路径"],
});
export const PagePathEnum = Enum.getEnumInstance({
  PATH_PAGE: [4, "PagePath页面路径"],
  PATH_APPLET: [5, "PagePath小程序路径"],
});
```

### 监听事件的使用方式

**前言**：页面之间的跳转有时会携带一些特点的参数，但在有些业务场景下使用页面路径携带参数进行跳转，会显得特别的臃肿。我在这里举一个简单的例子：在页面A中存在一个`count`属性默认值为0，用于记录页面B商品预览次数。如果页面B触发了商品预览则页面A中的`count`属性加1。这时候我们就需要在页面A中定义一个监听事件，用于捕获页面B所触发的预览事件。（当然这上面的业务场景你们可以用`Store`或者本地缓存都能实现）

`Event.js`事件类：对`uni.$emit(key,data)`、`uni.$on(key,callback)`等方法做了一层封装。

* `EVENT_LIST`静态属性：用于记录已存在的事件。
* `getEnumInstance(eventName)`静态方法：获取新的`Event`实例，传递事件名参数。
* `getEventList()`分别提供一个公用、静态方法：用于获取已存在的事件。
* `$emit(data)`触发事件：传递一个事件参数。
* `$on(callback)`监听事件：监听`$emit(data)`所触发的事件，`callback`回调函数接收事件参数。
* `$once(callback)`一次性使用事件，触发后将其移除：监听`$emit(data)`所触发的事件，`callback`回调函数接收事件参数。
* `$off(callback)`移除监听事件：监听`$emit(data)`所触发的事件，`callback`回调函数接收事件参数。

`GlobalEvents.js`引入了`Event.js`所有在开发的过程中我们只需要通过`Event.getEnumInstance(eventName)`来创建我们的事件监听器。

```js
export const eventUserLogin = Event.getEnumInstance("user_login");
```

在项目业务逻辑中使用方式：

```js
// 页面A
eventUserLogin.$on((e) => {
    console.log("事件触发:" + data)
})
eventUserLogin.$once((e) => {
    console.log("一次性事件触发:" + data)
})
eventUserLogin.$off((e) => {
    console.log("移除事件触发:" + data)
})
// 页面B
eventUserLogin.$emit("页面B的事件参数");
```

**注意事项**：

在使用事件监听工具类时，事件接收器（`$on`、`$once`、`$off`）一定要优先于事件触发器（`$emit`）加载，否则事件接收器将失效。