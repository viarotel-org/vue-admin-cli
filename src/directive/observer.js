/**
 * @desc 指令 交叉观察者
 */
export function observer(el, binding) {
  const { arg: options = {}, value: callback } = binding;
  const io = new IntersectionObserver(callback, options);
  io.observe(el);
}

export default {
  install: (app) => app.directive("observer", observer),
  observer,
};
