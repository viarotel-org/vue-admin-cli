<template>
  <layout>
    <router-view v-slot="{ Component }">
      <via-fade-transform>
        <keep-alive :include="cachedViewsArr">
          <component
            :is="Component"
            :key="key"
          />
        </keep-alive>
      </via-fade-transform>
    </router-view>
  </layout>
</template>

<script>
import Layout from "@/views/home/components/Layout";
import ViaFadeTransform from "@/components/ViaFadeTransform";
export default {
  components: { Layout, ViaFadeTransform },
  data() {
    return {
      demoData: "",
    };
  },
  computed: {
    cachedViewsArr() {
      return this.$store.state.tagsView.cachedViewsArr;
    },
    key() {
      return this.$route.path;
    },
  },
  methods: {
    async getDemoData() {
      const data = await this.$store.dispatch("demo/getDemoData");
      this.demoData = data;
    },
  },
};
</script>

<style></style>
