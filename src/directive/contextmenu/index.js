import { createApp } from "vue";
import ContextmenuComponent from "./Contextmenu";
const __ctxmenu__ = "__ctxmenu__";

const contextmenuListener = ({ el, event, binding }) => {
  event.stopPropagation();
  event.preventDefault();

  let instance, mask;

  const menus = binding.value(el);
  if (!menus) return;

  const isDark = binding.modifiers.dark;

  const removeContextMenu = () => {
    if (instance) {
      document.body.removeChild(instance.$el);
      instance = null;
    }
    if (mask) {
      mask.removeEventListener("contextmenu", handleMaskContextmenu);
      mask.removeEventListener("click", removeContextMenu);
      document.body.removeChild(mask);
      mask = null;
    }
    el.classList.remove("contextmenu-active");
    document.body.removeEventListener("scroll", removeContextMenu);
    window.removeEventListener("resize", removeContextMenu);
  };

  const handleMaskContextmenu = (event) => {
    event.preventDefault();
    removeContextMenu();
  };

  removeContextMenu();

  mask = document.createElement("div");
  mask.style = `
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9998;
  `;
  document.body.appendChild(mask);
  const app = createApp(ContextmenuComponent, {
    axis: { x: event.x, y: event.y },
    el,
    menus,
    isDark,
    removeContextMenu,
  });
  instance = app.mount(document.createElement("div"));
  // console.log("instance", instance);
  document.body.appendChild(instance.$el);
  el.classList.add("contextmenu-active");

  mask.addEventListener("contextmenu", handleMaskContextmenu);
  mask.addEventListener("click", removeContextMenu);
  document.body.addEventListener("scroll", removeContextMenu);
  window.addEventListener("resize", removeContextMenu);
};

export const ContextmenuDirective = {
  beforeMount(el, binding) {
    el[__ctxmenu__] = (event) => contextmenuListener({ el, event, binding });
    el.addEventListener("contextmenu", el[__ctxmenu__]);
  },
  unmounted(el) {
    if (el && el[__ctxmenu__]) {
      el.removeEventListener("contextmenu", el[__ctxmenu__]);
      delete el[__ctxmenu__];
    }
  },
};

export default {
  install(app) {
    app.directive("contextmenu", ContextmenuDirective);
  },
  ContextmenuDirective,
};
