# gc_web

#### 拉代码
git clone https://github.com/DorisTK/gc_web.git

#### 安装依赖
yarn install


#### 运行项目
yarn run dev


#### 开发目录规范
.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── Page1
            |——models             //页面1的model
            |——service            //页面1的service
            |——component
                |——Component1.js   // 页面 1的组件1的任意命名，导出 react 组件
                |——Component1.less // 页面 1的组件1的样式文件
            |——page1.js            // 页面 1，任意命名，导出 react 组件
            |——page1.less          // 页面 1，样式文件
            ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
       ├── Page2
            |——models             //页面2的model
            |——service            //页面2的service
            |——component
                |——Component1.js   // 页面 2的组件2的任意命名，导出 react 组件
                |——Component1.less // 页面 2的组件2的样式文件
            |——page2.js            // 页面 2，任意命名，导出 react 组件
            |——page2.less          // 页面 2，样式文件
            ├── page2.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
    ├── util                     // 工具类文件夹
        |——util.js
├── .env                           // 环境变量
└── package.json