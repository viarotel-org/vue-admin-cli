<template>
  <div
    class="bg-blue-gray-900 py-4 pl-4 flex items-center cursor-pointer"
    @click="$router.push({ name: 'home' })"
  >
    <img
      :src="logo"
      alt=""
      class="w-8 block"
    />
    <span
      :class="isCollapse ? 'w-0' : 'w-44 duration-500'"
      class="text-white font-bold pl-4 text-base truncate transition-all"
    >{{ title }}</span>
  </div>
</template>

<script>
import { logo, title } from "@/config";
export default {
  props: {
    isCollapse: {
      type: Boolean,
    },
  },
  data() {
    return {
      logo: logo(),
      title,
    };
  },
};
</script>

<style></style>
