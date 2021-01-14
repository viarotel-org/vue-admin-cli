/* eslint-disable no-unused-vars */
import {
  createRouter as CreateRouter,
  createWebHashHistory,
  // createWebHistory,
  // createMemoryHistory
} from "vue-router"; //vue 3

/**
 * @param {array} routes 路由表数组
 * @param {object} 路由配置
 * @returns {object} 路由实例
 */
export function createRouter(
  routes = [],
  { base = process.env.BASE_URL, mode = "hash", ...moreOptions } = {}
) {
  let createHistory = "";
  switch (mode) {
    case "hash":
      createHistory = createWebHashHistory;
      break;
    // case "history":
    //   createHistory = createWebHistory;
    //   break;
    // case "abstract":
    //   createHistory = createMemoryHistory;
    //   break;
  }
  const router = CreateRouter({
    history: createHistory(base),
    routes,
    ...moreOptions,
  });
  return router;
}
