项目运行
1. npm install // yarn install
2. npm serve // yarn serve

文件说明
├── src
│   ├── App.vue
│   ├── assets // 静态资源
│   ├── components // 所有组件
│   │   └── common // 与业务无关的组件
│   ├── config
│   │   └── api.ts // axios请求配置
│   ├── global.d.ts // 全局声明
│   ├── layout // 布局模块
│   │   ├── Container.vue
│   │   └── Section.vue
│   ├── main.ts // 程序入口
│   ├── mock
│   │   ├── data // mock数据
│   │   │   ├── app.ts
│   │   │   ├── course.ts
│   │   │   └── home.ts
│   │   └── index.ts // mock配置
│   ├── router // 路由
│   │   └── index.ts
│   ├── shims-tsx.d.ts
│   ├── shims-vue.d.ts
│   ├── style
│   │   ├── import-lib-base.scss // 样式变量
│   │   ├── import-lib-module.scss // 样式模块
│   │   ├── import-lib-reset.scss // 重置样式
│   │   ├── import.scss // 自动导入样式到组件的入口文件
│   │   └── index.scss // 挂载样式到全局的入口文件
│   ├── utils
│   │   └── http.ts // axios，api请求相关
│   └── views // 所有页面
│       ├── Course.vue
│       ├── Error.vue
│       └── Home.vue