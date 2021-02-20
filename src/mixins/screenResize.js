import { windowSize } from "./windowSize";

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const breakpoint = Object.keys(screens).reduce((obj, key) => {
  obj[key] = false;
  return obj;
}, {});

export const screenResize = {
  mixins: [windowSize],
  data() {
    return {
      _breakpoint: { ...breakpoint },
    };
  },
  computed: {
    $_screen() {
      return this._breakpoint;
    },
  },
  beforeMount() {
    this.$watch("$windowWidth", this.$_resizeHandler, { immediate: true });
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler(width) {
      // console.log("width", width);
      const _breakpoint = this._breakpoint;
      for (const key in _breakpoint) {
        if (Object.hasOwnProperty.call(_breakpoint, key)) {
          _breakpoint[key] = width >= screens[key];
        }
      }
    },
  },
};
export default {
  install: (app) => app.mixin(screenResize),
  screenResize,
};
