import { getStorages, setStorages } from "@/plugins/storages";
import request from "@/request";

export default {
  namespaced: true,
  state: () => ({
    siteInfo: getStorages("siteInfo") || {
      themeColor: "",
      isDark: "",
      fileBaseUrl: "",
      appLogo: "",
      appName: "",
      tabbarArr: []
    }
  }),
  getters: {
    themeTextColorStyle(state) {
      return `color: ${state.siteInfo.themeColor};`;
    },
    themeBgColorStyle(state) {
      return `background-color: ${state.siteInfo.themeColor};`;
    }
  },
  mutations: {
    setSiteInfo(state, data) {
      state.siteInfo = data;
      setStorages("siteInfo", data);
    }
  },
  actions: {
    //获取站点信息
    // eslint-disable-next-line no-empty-pattern
    async getSiteInfo({}, { params = {}, options = {} } = {}) {
      const { result: data } = await request.getSiteInfo(params, options);
      return data;
    }
  }
};
