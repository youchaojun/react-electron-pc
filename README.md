# React + Electron 桌面应用

## 最终效果

[视频 demo](https://www.bilibili.com/video/BV1Ny4y1Y7EU/)

### 技术栈

react + react-router-dom + typescript + react-redux + redux-saga + antd + react-router-cache-route + electron

### 应用场景

- tab 多窗口
  由于用 electron 开发应用，需要打开多个窗口时，如果用 a 标签的\_blank 会弹出一个子窗口，而不是新 tab。所以需要我们手写 tab，要想实现 tab 之前相互切换并缓存之前的状态，则就会需要用到路由缓存，这里用 [react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)
- 改写 electron 菜单栏
  electron 有一个默认的菜单栏，会是一个白边，我们需要在菜单栏上加入基本信息，所以需要改写。
  react 组件与 electron 同学需要用到 ipcMain 和 ipcRenderer

### 项目结构

```
.
├── config
├── docs
├── electron
├── httpTest
├── public
└── src
    ├── assets
    │   ├── styles
    │   └── svg
    ├── components
    │   └── Menu
    ├── layouts
    │   ├── ElectronMenu
    │   └── User
    ├── pages
    │   ├── EmptyPage
    │   ├── Error
    │   ├── Home
    │   │   └── HomeChildren
    │   ├── Login
    │   │   └── components
    │   ├── PageCache
    │   ├── ScrollTop
    │   └── Update
    ├── routers
    │   └── menuRouter
    ├── services
    │   └── home
    ├── store
    │   ├── actionCreators
    │   ├── actionTypes
    │   ├── reducers
    │   ├── sagas
    │   └── states
    ├── typings
    └── utils

```

### 使用说明

- 接口配置
  提供四种配置，dev,BUG,测试，生产
  分别在文件.env 中配置

```
REACT_APP_DEV = http://xxxxxxxxx/
REACT_APP_BUG = http://xxxxxxxxx/
REACT_APP_TEST = http://xxxxxxxxx/
REACT_APP_PROD = http://xxxxxxxxx/
REACT_APP_VERSION=$npm_package_version
```

- 启动说明

```
yarn // 安装依赖
yarn  start // 启动dev,浏览器中调试
yarn startE // 启动electron
yarn build // 打包react 项目
yarn dist-win // window 打包
yarn dist-mac // mac 打包
```

- electron 配置
  electron 配置文件在 electron/main.js

- less 变量配置
  less 变量配置在 config/lessGlobal.js

- 路由配置
路由配置放在routers中，menuRouter为菜单的配置
```
{
    name: '首页', // 路由名字
    path: '/home', // 路由path,用于跳转
    basePath: '/home', // 路由path,用于判断增加tab菜单的
    component: Home, 
    exact: true, 
    cache: false, // 是否缓存路由
    children: [
      {
        name: '子页面',
        path: '/children',
        basePath: '/children',
        component: HomeChildren,
        isTab: false, // 是否要打开tab窗口，false为不打开（true和不定义都是有tab窗口），则会往上找有tab的，就位在次tab下形成面包屑
        exact: true,
        cache: false, // 是否缓存路由
        children: [],
      },
    ],
  },
```

后续在更新更多使用方法，也欢迎大家提issue

[guthub 地址](https://github.com/youchaojun/react-electron-pc)
