<template>
  <transition
    name="fade-transform"
    mode="out-in"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "ViaFadeTransform",
};
</script>

<style lang="scss" scoped>
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
