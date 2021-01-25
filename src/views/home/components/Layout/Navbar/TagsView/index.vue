<template>
  <div class="shadow py-2 px-4 border-t">
    <scroll-pane
      ref="scrollPane"
      :tags-refs="tagsRefsArr"
      @scroll="handleScroll"
    >
      <el-tag
        v-for="item of viewsArr"
        :key="item.title"
        :ref="($el) => tagsRefsArr.push($el)"
        v-contextmenu:contextmenu
        :view="item"
        hit
        :closable="!item.affix"
        size="small"
        :effect="isActive(item.path) ? 'dark' : 'plain'"
        class="mr-2 flex-shrink-0 cursor-pointer"
        @contextmenu="selectedTag = item"
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

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="refreshSelectedTag(selectedTag)">
        刷新
      </v-contextmenu-item>
      <v-contextmenu-item
        v-if="!selectedTag.affix"
        @click="closeSelectedTag(selectedTag)"
      >
        关闭
      </v-contextmenu-item>
      <v-contextmenu-item @click="closeOthersTags(selectedTag)">
        关闭其他
      </v-contextmenu-item>
      <v-contextmenu-item @click="closeAllTags">
        关闭所有
      </v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
import path from "path";
import ScrollPane from "./ScrollPane";
export default {
  components: { ScrollPane },
  data() {
    return {
      //选中的标签数据
      selectedTag: {},
      //固定的标签列表
      affixTagArr: [],
      //标签dom实例列表
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
    /**
     * @desc 刷新选中的标签页面
     */
    async refreshSelectedTag(view) {
      await this.$store.dispatch("tagsView/delCachedView", view);
      await this.$nextTick();
      this.$router.go(0);
    },
    /**
     * @desc 关闭标签时 跳转到适合的视图标签
     */
    toLastView(viewsArr) {
      const latestView = viewsArr.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        this.$router.push("/");
      }
    },
    /**
     * @desc 关闭所有非固定标签
     */
    async closeAllTags() {
      const { viewsArr } = await this.$store.dispatch("tagsView/delAllViews");
      console.log("viewsArr", viewsArr);
      this.toLastView(viewsArr);
    },
    /**
     * @desc 关闭除选中标签外的其他标签
     */
    async closeOthersTags(view) {
      this.$router.push(view);
      await this.$store.dispatch("tagsView/delOthersViews", view);
      this.moveToCurrentTag();
    },
    /**
     * @desc 关闭选中的标签
     */
    async closeSelectedTag(view) {
      const { viewsArr } = await this.$store.dispatch("tagsView/delView", view);
      if (this.isActive(view.path)) {
        this.toLastView(viewsArr);
      }
    },
    /**
     * @desc 判断是否为激活状态
     */
    isActive(path) {
      return path === this.$route.path;
    },
    /**
     * @desc 初始化视图标签
     */
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
    /**
     * @desc 添加视图标签
     */
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    /**
     * @desc 过滤固定的标签列表
     */
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
    /**
     * @desc 移动选中的标签到视图内
     */
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
    /**
     * @desc 滚动时触发 关闭上下文菜单
     */
    handleScroll() {
      this.$refs.contextmenu.hide();
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
