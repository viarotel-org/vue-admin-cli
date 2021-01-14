import Vue from "vue";
import VueRouter from "vue-router";

/**
 * @param {array} routes 路由表数组
 * @param {object} 路由配置
 * @returns {object} 路由实例
 */
export function createRouter(
  routes = [],
  { base = process.env.BASE_URL, mode = "hash", ...moreOptions } = {}
) {
  //路由防抖
  const originalPush = VueRouter.prototype.push;
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
  };

  Vue.use(VueRouter);

  return new VueRouter({
    mode,
    base,
    routes,
    ...moreOptions
  });
}
