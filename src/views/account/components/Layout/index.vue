<template>
  <div
    class="bg-no-repeat bg-cover absolute inset-0 flex flex-col items-stretch"
    :style="{
      backgroundImage: `url(${require('@/assets/images/bg-account-layout.jpg')})`,
    }"
  >
    <div
      class="flex items-center text-white justify-center pt-4 flex-shrink-0 md:justify-start md:pl-4"
    >
      <img
        :src="logo"
        alt="qianye"
        class="w-10"
      />
      <span class="text-shadow-sm text-lg pl-2">{{ title }}</span>
    </div>
    <div class="flex-grow flex items-center">
      <div
        class="bg-white rounded-px-15 w-11/12 mx-auto md:w-120 p-6 hover:shadow transition-all transform hover:scale-105 duration-500"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { logo, title } from "@/config";
export default {
  name: "Layout",
  data() {
    return {
      logo: logo(),
      title,
    };
  },
};
</script>

<style></style>
