import { merge } from "lodash-es";
import { isBoolean, isFunction } from "@/utils/index";
import { getDictLabel } from "@/utils/index";
import dictConfig from "@/config/dict";
/**
 * @desc 生成动态路由配置表
 * @param {object}  banList 黑名单
 * @param {object}  mixins 路由混入列表
 */
export function createAsyncRouterList({ banList = {}, mixins = {} } = {}) {
  // eslint-disable-next-line no-useless-escape
  const getFileName = (path) => path.replace(/(.*\/)*([^\/]+).*/gi, "$2");
  const arrayToTreeObject = (arr) =>
    arr.reduceRight((result, key) => ({ [key]: result }), {});
  const treeObjFormat = (obj, callBack) =>
    Object.keys(obj).map((key) => ({
      ...(Object.keys(obj[key] || []).length
        ? { children: treeObjFormat(obj[key], callBack) }
        : {}),
      ...callBack(key),
    }));
  const getFilePathList = (banList) => {
    const files = require.context("@/views", true, /\/$/);
    const isBan = (path) => {
      const isBool = banList[getFileName(path)];
      return isBoolean(isBool) && isBool;
    };
    return files
      .keys()
      .filter(
        (path) => path !== "./" && !/components/i.test(path) && !isBan(path)
      );
  };

  const filePathArr = getFilePathList(banList);

  const routerIndexObj = filePathArr.reduce((obj, i) => {
    const name = getFileName(i);
    const path = i.slice(1, -1);
    const title = getDictLabel(dictConfig.router, name);
    const mixinsValue = mixins[name] || {};
    const baseObj = {
      name,
      path,
      component: () => import(`@/views${path}`),
      meta: {
        title,
      },
    };
    obj[name] = {
      ...baseObj,
      ...(isFunction(mixinsValue) ? mixinsValue(baseObj) : mixinsValue),
    };
    return obj;
  }, {});

  const treeObj = filePathArr.reduce((obj, i) => {
    let pathArr = i.split("/").slice(1, -1);
    obj = merge(obj, arrayToTreeObject(pathArr));
    return obj;
  }, {});
  return treeObjFormat(treeObj, (key) => routerIndexObj[key]);
  // console.log(filePathArr);
  // console.log(treeObj);
}
