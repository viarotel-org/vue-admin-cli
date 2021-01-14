<template>
  <div
    class="flex absolute inset-0 h-full"
  >
    <sidebar
      v-model:is-show="isSidebar"
      v-model:is-fold="isFoldSidebar"
      class="flex-shrink-0"
    ></sidebar>
    <div class="flex-grow h-full flex flex-col overflow-hidden">
      <navbar
        v-model:is-sidebar="isSidebar"
        v-model:is-fold-sidebar="isFoldSidebar"
        class="flex-shrink-0"
      ></navbar>
      <main-content class="flex-grow">
        <slot></slot>
      </main-content>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import { screenResize } from "@/mixins/screenResize";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    MainContent,
  },
  mixins: [screenResize],
  provide() {
    return {
      $_screen: this.$_screen,
    };
  },
  data() {
    return {
      isFoldSidebar: false,
      isSidebar: true,
    };
  },
  created() {
    // console.log("this", this.$attrs);
  },
};
</script>

<style></style>
