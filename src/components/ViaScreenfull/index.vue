<template>
  <div @click="click">
    <slot>
      <via-svg-icon
        class="cursor-pointer text-xl"
        v-bind="$attrs"
        :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      />
    </slot>
  </div>
</template>

<script>
import screenfull from "screenfull";
import { dialog } from "@/plugins/modal";
export default {
  name: "ViaScreenfull",
  data() {
    return {
      isFullscreen: false,
      isEnabled: screenfull.isEnabled,
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destroy();
  },
  methods: {
    click() {
      if (!this.isEnabled) {
        dialog("该浏览器未启用此功能", {
          type: "warning",
        });
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (this.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (this.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style></style>
