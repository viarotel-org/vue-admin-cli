import { createApp } from "vue";
import App from "./views";
import router from "./router";
import store from "./store";
//引入全局样式
import "./styles/scss/index.scss";
import "./styles/css/index.css";

const app = createApp(App);
//挂载全局指令
import { clampAuto } from "./directive/index";
app.use(clampAuto);
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
//引入上下文菜单插件
import contentmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
app.use(contentmenu);
//全局挂载的方法对象
app.config.globalProperties.$via = {};

app.use(store);
app.use(router);
app.mount("#app");
