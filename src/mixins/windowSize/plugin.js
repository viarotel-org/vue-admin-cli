import { vueWindowSizeMixin } from "vue-window-size/option-api";

export const windowSize = vueWindowSizeMixin();

export default {
  install: (app) => app.mixin(windowSize),
  windowSize,
};