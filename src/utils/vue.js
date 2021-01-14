/**
 * @desc 由一个组件，向上找到最近的指定组件；由一个组件，向上找到所有的指定组件； 由一个组件，向下找到最近的指定组件；由一个组件，向下找到所有指定的组件；由一个组件，找到指定组件的兄弟组件。
 * @param {*} ctx 上下文
 * @param {*} componentName 组件名称
 */

export function findComponentUpward(componentName, ctx = this) {
  let parent = ctx.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}