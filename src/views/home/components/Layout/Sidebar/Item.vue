<template>
  <el-submenu
    v-if="isChildren"
    :index="item.name"
  >
    <template #title>
      <icon :name="item.icon"></icon>
      <span class="">{{ getTitle(item) }}</span>
    </template>
    <sidebar-item
      v-for="(iItem, iIndex) of item.children"
      :key="iIndex"
      :item="iItem"
    ></sidebar-item>
  </el-submenu>
  <el-menu-item
    v-else
    :index="item.name"
    class=""
    @click="skipView(item)"
  >
    <icon :name="item.icon"></icon>
    <template #title>
      <span>{{ getTitle(item) }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import { getDictLabel } from "@/utils/index";
import dictConfig from "@/config/dict";
import Icon from "./Icon";
export default {
  name: "SidebarItem",
  components: { Icon },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    active: {
      type: String,
      default: "",
    },
  },
  computed: {
    isChildren() {
      return this.item.children && this.item.children.length;
    },
    isActive() {
      return this.item.id === this.active;
    },
  },
  methods: {
    skipView({ name = "", query = {}, isReplace = false }) {
      const method = isReplace ? "replace" : "push";
      name && this.$router[method]({ name, query });
    },
    getTitle({ name = "" }) {
      return getDictLabel(dictConfig.router, name);
    },
  },
};
</script>

<style></style>
