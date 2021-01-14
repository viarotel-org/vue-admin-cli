export default {
  namespaced: true,
  state: () => ({
    viewsArr: [],
    cachedViewsArr: [],
  }),
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.viewsArr.some((v) => v.path === view.path)) return;
      // console.log("view", view);
      state.viewsArr.push({
        ...view,
        name: view.name,
        title: view.meta.title || "no-name",
        affix: !!view.meta.affix,
      });
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViewsArr.includes(view.name)) return;
      if (!view.meta.noCache) {
        state.cachedViewsArr.push(view.name);
      }
    },

    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.viewsArr.entries()) {
        if (v.path === view.path) {
          state.viewsArr.splice(i, 1);
          break;
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      const index = state.cachedViewsArr.indexOf(view.name);
      index > -1 && state.cachedViewsArr.splice(index, 1);
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      state.viewsArr = state.viewsArr.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      const index = state.cachedViewsArr.indexOf(view.name);
      if (index > -1) {
        state.cachedViewsArr = state.cachedViewsArr.slice(index, index + 1);
      } else {
        // if index = -1, there is no cached tags
        state.cachedViewsArr = [];
      }
    },

    DEL_ALL_VISITED_VIEWS: (state) => {
      // keep affix tags
      const affixTags = state.viewsArr.filter((tag) => tag.meta.affix);
      state.viewsArr = affixTags;
    },
    DEL_ALL_CACHED_VIEWS: (state) => {
      state.cachedViewsArr = [];
    },

    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.viewsArr) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch("addVisitedView", view);
      dispatch("addCachedView", view);
    },
    addVisitedView({ commit }, view) {
      commit("ADD_VISITED_VIEW", view);
    },
    addCachedView({ commit }, view) {
      commit("ADD_CACHED_VIEW", view);
    },

    delView({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delVisitedView", view);
        dispatch("delCachedView", view);
        resolve({
          viewsArr: [...state.viewsArr],
          cachedViewsArr: [...state.cachedViewsArr],
        });
      });
    },
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_VISITED_VIEW", view);
        resolve([...state.viewsArr]);
      });
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_CACHED_VIEW", view);
        resolve([...state.cachedViewsArr]);
      });
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delOthersVisitedViews", view);
        dispatch("delOthersCachedViews", view);
        resolve({
          viewsArr: [...state.viewsArr],
          cachedViewsArr: [...state.cachedViewsArr],
        });
      });
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_OTHERS_VISITED_VIEWS", view);
        resolve([...state.viewsArr]);
      });
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit("DEL_OTHERS_CACHED_VIEWS", view);
        resolve([...state.cachedViewsArr]);
      });
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch("delAllVisitedViews", view);
        dispatch("delAllCachedViews", view);
        resolve({
          viewsArr: [...state.viewsArr],
          cachedViewsArr: [...state.cachedViewsArr],
        });
      });
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit("DEL_ALL_VISITED_VIEWS");
        resolve([...state.viewsArr]);
      });
    },
    delAllCachedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit("DEL_ALL_CACHED_VIEWS");
        resolve([...state.cachedViewsArr]);
      });
    },

    updateVisitedView({ commit }, view) {
      commit("UPDATE_VISITED_VIEW", view);
    },
  },
};
