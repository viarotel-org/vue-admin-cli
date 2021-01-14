<template>
  <div class="">
    demo
    <el-input v-model="vlaue"></el-input>
    <el-button @click="$router.push({ name: 'test' })">test</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vlaue: "",
    };
  },
  methods: {},
};
</script>

<style></style>
