const clickEventType = document.ontouchstart !== null ? "click" : "touchstart";

const UNIQUE_ID = "__vue_click_away__";

const onMounted = (el, binding, vnode) => {
  onUnmounted(el);

  let vm = vnode.context;
  let callback = binding.value;

  let nextTick = false;
  setTimeout(function() {
    nextTick = true;
  }, 0);

  el[UNIQUE_ID] = (event) => {
    if (
      (!el || !el.contains(event.target)) &&
      callback &&
      nextTick &&
      typeof callback === "function"
    ) {
      return callback.call(vm, event);
    }
  };

  document.addEventListener(clickEventType, el[UNIQUE_ID], false);
};

const onUnmounted = (el) => {
  document.removeEventListener(clickEventType, el[UNIQUE_ID], false);
  delete el[UNIQUE_ID];
};

const onUpdated = (el, binding, vnode) => {
  if (binding.value === binding.oldValue) {
    return;
  }
  onMounted(el, binding, vnode);
};

/**
 * @desc 点击除元素本身以外的地方执行
 * @demo v-click-away="callback"
 */
export const clickAway = {
  mounted: onMounted,
  updated: onUpdated,
  unmounted: onUnmounted,
};

export default {
  install: (app) => app.directive("clickAway", clickAway),
  clickAway,
};
