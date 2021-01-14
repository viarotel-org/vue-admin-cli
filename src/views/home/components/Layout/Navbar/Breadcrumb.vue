<template>
  <el-breadcrumb
    separator="/"
    class="flex items-center overflow-x-auto"
  >
    <el-breadcrumb-item
      v-for="(item, index) of levelArr"
      :key="index"
      class="flex-shrink-0"
      :to="{ name: item.name, query: item.query }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    levelArr() {  
      // console.log("this.$route", this.$route);
      let tempArr = [];
      tempArr = this.$route.matched.reduce(
        (arr, { name, meta: { title }, query }) => {
          if (name === this.$route.name) {
            query = this.$route.query;
          }
          arr.push({ name, title, query });
          return arr;
        },
        []
      );
      // console.log("tempArr", tempArr);
      return tempArr;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
// .breadcrumb-enter-active,
// .breadcrumb-leave-active {
//   transition: all 0.5s;
// }

// .breadcrumb-enter,
// .breadcrumb-leave-active {
//   opacity: 0;
//   transform: translateX(20px);
// }

// .breadcrumb-move {
//   transition: all 0.5s;
// }

// .breadcrumb-leave-active {
//   position: absolute;
// }
</style>
