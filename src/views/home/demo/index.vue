<template>
  <el-card class="box-card">
    <template #header>
      <span>演示页面</span>
    </template>
    <div class="flex flex-col items-start">
      <el-button
        class=""
        @click="$router.push({ name: 'test' })"
      >
        跳转test
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
