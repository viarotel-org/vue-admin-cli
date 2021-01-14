import { isBoolean } from "@/utils/index";

/**
 * @desc 指令 反向事件 例如点击空白处关闭某个元素 v-on-reverse:[arg].[modifiers]="value"
 * @param arg  arg为控制元素是否显示的变量
 * @param modifiers  modifiers可以为其他值如input
 * @param value  value为反向事件触发的回调
 */

export function onReverse(el, binding) {
  // console.log("el", el);
  // console.log("binding", binding);
  const {
    arg: status,
    modifiers: eventNameObj = { click: true },
    value: callback,
  } = binding;
  if (!callback) {
    return Error("事件回调不能为空");
  }
  if (!isBoolean(status)) {
    return Error("状态值不能为空");
  }
  let method = status ? "addEventListener" : "removeEventListener";
  const mapEventListener = (obj, { method, callback } = {}) =>
    Object.keys(obj).forEach((item) => document.body[method](item, callback));
  mapEventListener(eventNameObj, {
    method,
    callback,
  });
}
export default {
  install: (app) => app.directive("onReverse", onReverse),
  onReverse,
};
