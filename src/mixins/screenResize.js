const { body } = document;

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const screenResize = {
  data() {
    return {
      _screen: Object.keys(screens).reduce((obj, key) => {
        obj[key] = false;
        return obj;
      }, {}),
    };
  },
  computed: {
    $_screen() {
      return this._screen;
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    this.$_resizeHandler();
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler() {
      if (!document.hidden) {
        const screen = this._screen;
        const { width } = body.getBoundingClientRect();
        for (const key in screen) {
          if (Object.hasOwnProperty.call(screen, key)) {
            screen[key] = width >= screens[key];
          }
        }
        // console.log("getBoundingClientRect.width", width);
        // console.log("$_screen", screen);
      }
    },
  },
};
export default {
  install: (app) => app.mixin(screenResize),
  screenResize,
};
