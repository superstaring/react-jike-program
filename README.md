## 安装 sass

`npm install -D sass`

## 安装 antd，PC 端组件库

`npm install antd --save`

## 配置@别名路径

1.安装 craco 工具包： `npm install @craco/craco -D`

2.增加 craco.config.js 配置文件

3.修改 script 命令

4.vscode 提示配置：在根目录创建 jsconfig.json 配置文件

## 封装 axios

## axios 请求拦截器注入 Token

Token 作为用户的一个标识数据，后端很多接口都会以它作为接口权限判断的依据；请求拦截器注入 Token 之后，所有用到 Axios 实例的接口请求都自动携带了 Token。

## 初始化样式的第三方库

`npm install normalize.css`

## 处理 Token 失效

### 什么是 Token 失效

为了用户的安全和隐私考虑，在用户长时间未在网站中做任何操作且规定的实效时间到达之后，当前的 Token 就会失效，一旦失效，不能再作为用户令牌标识请求隐私数据。

### 前端如何知道 Token 已经失效

通常在 Token 失效之后再去请求接口，后端会返回 401 状态码，前端可以监控这个状态做后续的操作。

### Token 失效了前端做什么

- 在 axios 拦截中监控 401 状态码
- 清除失效 Token，跳转登录

```
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 监控401 token失效 number
    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

```

### 安装 echarts 第三方库

`npm install echarts`

### api 模块封装

没有在固定的模块内维护，后期查找维护困难。把项目中的所有接口按照业务模块以函数的形式，统一封装到 apis 模块中。

## 导入富文本 react-quill

安装固定版本，与 react18 版本兼容。

`npm i react-quill@2.0.0-beta.2`提示报错，从新执行`npm i react-quill@2.0.0-beta.2 --legacy-peer-deps`

`import ReactQuill from "react-quill";`

## 表单

```
  import { useSearchParams } from "react-router-dom";
  // 回填数据
  const [form] = Form.useForm();
  // 根据id获取文章详情
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
```

## 通过自定义 hook 获取频道列表

`import { useChannel } from "@/hooks/useChannel";`
