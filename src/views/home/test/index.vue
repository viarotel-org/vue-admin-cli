<template>
  <div class="">
    test
    <el-input v-model="vlaue"></el-input>
    <el-button @click="$router.push({ name: 'demo' })">demo</el-button>
  </div>
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
