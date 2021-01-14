<template>
  <layout>
    <router-view v-slot="{ Component }">
      <via-fade-transform>
        <component :is="Component" />
      </via-fade-transform>
    </router-view>
  </layout>
</template>

<script>
import Layout from "@/views/account/components/Layout";
import ViaFadeTransform from "@/components/ViaFadeTransform";
export default {
  name: "Account",
  components: { Layout, ViaFadeTransform },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
