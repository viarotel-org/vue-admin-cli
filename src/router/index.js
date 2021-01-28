import { createRouter, getAsyncRouterList } from "@/plugins/router";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { toast } from "@/plugins/modal";

//自动生成并配置路由表
const dynamicRouterArr = getAsyncRouterList({
  banList: {
    // account: true,
  },
  mixins: {
    home: {
      redirect: { name: "demo" },
    },
    account: {
      redirect: { name: "login" },
    },
    demo: ({ meta }) => ({
      meta: { ...meta, affix: true },
    }),
  },
});
// console.log(dynamicRouterArr);

const router = createRouter(
  [
    ...dynamicRouterArr,
    {
      path: "/:pathMatch(.*)*",
      name: "intercept",
      redirect: { name: "account" },
    },
  ],
  { mode: "hash" }
);

router.beforeEach((to, from, next) => {
  console.log("router.beforeEach.to:", to);
  console.log("router.beforeEach.from:", from);
  const includes = (name) => to.path.includes(`/${name}`);
  const token = store.getters.token;
  NProgress.start();
  if (token) {
    if (!includes("home")) {
      return next({ name: "home" });
    }
  } else {
    if (includes("home")) {
      toast("请先登录", { type: "warning" });
      return next({ name: "account" });
    }
  }
  next();
});

router.afterEach((to, from) => {
  console.log("router.afterEach.to:", to);
  console.log("router.afterEach.from:", from);
  NProgress.done();
});

export default router;
