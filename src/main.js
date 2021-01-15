import { createApp } from "vue";
import App from "./views";
import router from "./router";
import store from "./store";
//引入全局样式
import "./styles/scss/index.scss";
import "./styles/css/index.css";

const app = createApp(App);
//挂载全局指令
import { onReverse, clampAuto, contextmenu } from "./directive/index";
app.use(onReverse);
app.use(clampAuto);
app.use(contextmenu);
//全局混入
// import { screenResize } from "./mixins";
// app.use(screenResize);
//全局挂载请求 通过 this.$req进行使用
import request from "./request";
app.use(request);
//使用svg icon
import icons from "./icons";
app.use(icons);
//引入element-ui
import elementUi from "./plugins/element-ui";
app.use(elementUi);
//全局挂载的方法对象
app.config.globalProperties.$via = {};

app.use(store);
app.use(router);
app.mount("#app");