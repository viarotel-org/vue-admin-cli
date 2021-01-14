<template>
  <el-dropdown
    trigger="click"
    class=""
  >
    <div class="flex items-center">
      <el-avatar
        shape="circle"
        size="medium"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        alt="viarotel"
      ></el-avatar>
      <via-svg-icon
        name="bottom"
        class="text-xl text-gray-800 ml-1"
      />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of menuRightConfig"
          :key="item.name"
          :divided="!!item.divided"
          @click="onMenu(item)"
        >
          {{ getTitle(item) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import menuRightConfig from "@/config/menuRight";
import { getDictLabel } from "@/utils/index";
import dictConfig from "@/config/dict";
import { dialog, toast } from "@/plugins/modal";
export default {
  inject: ["$_screen"],
  data() {
    return {
      menuRightConfig,
    };
  },
  methods: {
    async onLogout({ name, query }) {
      const result = await dialog("确认要退出登录吗?", { isCancel: true });
      if (result) {
        this.$store.commit("user/removeToken");
        await toast("退出成功!", {
          type: "success",
          center: true,
          duration: 1000,
        });
        this.$router.push({ name, query });
      }
    },
    onMenu({ name, query = {}, logout = false }) {
      if (logout) {
        this.onLogout({ name, query });
      } else {
        this.$router.push({ name, query });
      }
    },
    getTitle({ name = "", logout = false }) {
      return logout ? "退出登录" : getDictLabel(dictConfig.router, name);
    },
  },
};
</script>

<style></style>
