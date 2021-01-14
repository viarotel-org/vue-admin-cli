<template>
  <div class="h-full">
    <div
      v-if="isShow"
      class="fixed inset-0 bg-black bg-opacity-25 block md:hidden z-10"
      @click="$emit('update:is-show', false)"
    ></div>
    <div
      :class="[
        isShow ? 'translate-x-0' : '-translate-x-60',
        !$_screen.md ? 'transform duration-500 transition-transform' : '',
      ]"
      class="absolute h-full flex flex-col md:relative z-50"
    >
      <logo
        v-if="isSidebarLogo"
        :is-collapse="isFold"
        class="flex-shrink-0"
      ></logo>
      <el-scrollbar>
        <!-- active-text-color="#409EFF" -->
        <el-menu
          text-color="#bfcbd9"
          background-color="#304156"
          class="flex-grow h-full border-r-0"
          :default-active="defaultActive"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <sidebar-item
            v-for="(item, index) of sidebarArr"
            :key="index"
            :item="item"
            :active="sidebarActive"
          >
          </sidebar-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import SidebarItem from "./Item";
import Logo from "./Logo";
import sidebarConfig from "@/config/sidebar";
import { isSidebarLogo } from "@/config/index";
export default {
  components: {
    SidebarItem,
    Logo,
  },
  inject: ["$_screen"],
  props: {
    isFold: {
      type: Boolean,
    },
    isShow: {
      type: Boolean,
    },
  },
  emits: ["update:is-show", "update:is-fold"],
  data() {
    return {
      sidebarArr: sidebarConfig,
      sidebarActive: "",
      isSidebarLogo,
    };
  },
  computed: {
    isCollapse() {
      return this.isFold;
    },
    //菜单默认选中
    defaultActive() {
      return this.getMenuActiveId(this.sidebarArr, {
        rule: (item) => item.name === this.$route.name,
      });
    },
  },
  watch: {
    "$_screen.md": {
      handler(value) {
        if (value) {
          this.$emit("update:is-show", true);
        } else {
          this.$emit("update:is-show", false);
          this.$emit("update:is-fold", false);
        }
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    /**
     * @desc 获取当前路由的id
     */
    getMenuActiveId(arr, { rule, name = "name" }) {
      return arr.reduce((id, item) => {
        const isChildren = item.children && item.children.length;
        if (isChildren) {
          id = this.getMenuActiveId(item.children, { rule });
        } else if (rule(item)) {
          id = item[name];
        }
        return id;
      }, "");
    },
    handleOpen(key, keyPath) {
      console.log("handleOpen");
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log("handleClose");
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log("handleSelect");
      console.log(key, keyPath);
      this.sidebarActive = key;
      if (!this.$_screen.md) {
        this.$emit("update:is-show", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  height: 100% !important;
}
:deep(.el-menu:not(.el-menu--collapse)) {
  width: 210px;
}
:deep(.el-menu.el-menu--collapse) {
  width: 60px;
}
:deep(.el-scrollbar__view) {
  height: 100% !important;
}
:deep(.el-menu:not(.el-menu--collapse)) {
  width: 210px;
}
:deep(.el-menu.el-menu--collapse) {
  width: 60px;
}
:deep(.el-menu-item i) {
  color: inherit !important;
}
</style>
