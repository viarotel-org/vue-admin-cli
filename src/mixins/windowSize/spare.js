const { body } = document;

export const windowSize = {
  data() {
    return {
      _windowWidth: 0,
      _windowHeight: 0,
    };
  },
  computed: {
    $windowWidth() {
      return this._windowWidth;
    },
    $windowHeight() {
      return this._windowHeight;
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$_getBoundingClientRect);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.$_getBoundingClientRect);
  },
  mounted() {
    this.$_getBoundingClientRect();
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_getBoundingClientRect() {
      if (document.hidden) return;
      const { width, height } = body.getBoundingClientRect();
      this._windowWidth = width;
      this._windowHeight = height;
    },
  },
};
export default {
  install: (app) => app.mixin(windowSize),
  windowSize,
};
