<template>
  <el-card class="box-card">
    <template #header>
      <span>测试页面</span>
    </template>
    <div class="flex flex-col items-start">
      <el-button
        class=""
        @click="$router.push({ name: 'demo' })"
      >
        跳转demo
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      vlaue: "",
    };
  },
};
</script>

<style></style>
