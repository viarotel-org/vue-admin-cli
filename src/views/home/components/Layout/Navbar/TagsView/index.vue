<template>
  <div class="shadow py-2 px-4 border-t">
    <scroll-pane
      ref="scrollPane"
      :tags-refs="tagsRefsArr"
      @scroll="handleScroll"
    >
      <el-tag
        v-for="item of viewsArr"
        :ref="($el) => tagsRefsArr.push($el)"
        :key="item.title"
        :view="item"
        hit
        :closable="!item.affix"
        size="small"
        :effect="isActive(item.path) ? 'dark' : 'plain'"
        class="mr-2 flex-shrink-0 cursor-pointer"
        @click="
          $router.push({
            name: item.name,
            query: item.query,
          })
        "
        @close="closeSelectedTag(item)"
      >
        {{ item.title }}
      </el-tag>
    </scroll-pane>
  </div>
</template>

<script>
import path from "path";
import ScrollPane from "./ScrollPane";
export default {
  components: { ScrollPane },
  data() {
    return {
      selectedTag: {},
      affixTagArr: [],
      tagsRefsArr: [],
    };
  },
  computed: {
    viewsArr() {
      return this.$store.state.tagsView.viewsArr;
    },
  },
  watch: {
    $route() {
      // console.log("$route", this.$route);
      if (this.$route.path.includes("/home")) {
        this.addTags();
        this.moveToCurrentTag();
      }
    },
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    toLastView(viewsArr) {
      const latestView = viewsArr.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        this.$router.push("/");
      }
    },
    closeSelectedTag(view) {
      this.$store.dispatch("tagsView/delView", view).then(({ viewsArr }) => {
        if (this.isActive(view.path)) {
          this.toLastView(viewsArr, view);
        }
      });
    },
    isActive(path) {
      return path === this.$route.path;
    },
    initTags() {
      console.log("$route", this.$route);
      this.affixTagArr = this.filterAffixTags(this.$route.matched);
      const affixTagArr = this.affixTagArr;
      for (const tag of affixTagArr) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    async moveToCurrentTag() {
      await this.$nextTick();
      for (const tag of this.tagsRefsArr) {
        const view = tag.$attrs.view;
        if (view.path === this.$route.path) {
          this.$refs.scrollPane.moveToTarget(tag);
          // when query is different then update
          if (view.fullPath !== this.$route.fullPath) {
            this.$store.dispatch("tagsView/updateVisitedView", this.$route);
          }
          break;
        }
      }
    },
    handleScroll() {
      // this.closeMenu();
    },
    contextmenus() {
      return [
        {
          text: "剪切",
          subText: "Ctrl + X",
        },
        {
          text: "复制",
          subText: "Ctrl + C",
        },
        {
          text: "粘贴",
          subText: "Ctrl + V",
        },
        { divider: true },
        {
          text: "删除",
          subText: "Delete",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  display: flex;
  align-items: center;
}
</style>
