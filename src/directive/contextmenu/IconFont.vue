<template>
  <svg class="icon-font">
    <use :xlink:href="'#' + type"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.icon-font {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}
</style>
