<template>
  <i
    v-if="isElIcon"
    :class="name"
  ></i>
  <via-svg-icon
    v-else
    class="text-2xl mr-2 align-middle"
    :name="name"
  ></via-svg-icon>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    isElIcon() {
      return this.name.includes("el-icon");
    },
  },
};
</script>

<style></style>
