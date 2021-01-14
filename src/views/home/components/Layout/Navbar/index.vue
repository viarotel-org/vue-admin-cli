<template>
  <div class="">
    <div class="flex items-center px-4 py-2">
      <via-svg-icon
        :name="isFoldSidebar ? 'fold' : 'unfold'"
        class="text-3xl text-gray-900 cursor-pointer flex-shrink-0"
        @click="handleFoldButton"
      />
      <breadcrumb class="mx-4 flex-grow overflow-hidden"></breadcrumb>
      <quick-bar
        v-if="$_screen.md"
        class="ml-auto flex-shrink-0"
      ></quick-bar>
      <menu-right class="flex-shrink-0 ml-4"></menu-right>
    </div>
    <tags-view></tags-view>
  </div>
</template>

<script>
import Breadcrumb from "./Breadcrumb";
import QuickBar from "./QuickBar";
import MenuRight from "./MenuRight";
import TagsView from "./TagsView";
export default {
  name: "Navbar",
  components: { Breadcrumb, QuickBar, MenuRight, TagsView },
  inject: ["$_screen"],
  props: {
    isFoldSidebar: {
      type: Boolean,
    },
  },
  emits: ["update:is-fold-sidebar", "update:is-sidebar"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleFoldButton() {
      if (this.$_screen.md) {
        this.$emit("update:is-fold-sidebar", !this.isFoldSidebar);
      } else {
        this.$emit("update:is-sidebar", !this.isSidebar);
      }
    },
  },
};
</script>

<style></style>
