import Vue from "vue";
// console.log(Vue.prototype) //undefined
import $api from "@/http/interface.js";

export default {
  state: {
    // 筛选框参数
    searchParam: {
      // start_date: '',
      // end_date: '',
      // org_id: '',
      // floor:'',
      // bizcat: '',
      // shop_id: '',
      // activity_id: ''
    }
  },
  getters: {},
  mutations: {
    updateSearchParam(state, newSearchParam) {
      state.searchParam = newSearchParam;
      console.log("hahahaha", state.searchParam);
    },
    updateOptions(state, options) {
      state.options = options;
    }
  },
  actions: {
    async getOptions({ commit }, param) {
      let [
        floorList,
        buildingList,
        shopList,
        activityList,
        bizcatList
      ] = await Promise.all([
        $api.getFloorList(),
        $api.getOrgList(),
        $api.getShopList(),
        $api.getActivityList(),
        $api.getBizcatList()
      ]);

      let options = {
        building: buildingList,
        floor: floorList,
        biacat: bizcatList,
        shop: shopList,
        activity: activityList
      };

      return new Promise((resolve, reject) => {
        this.commit("updateOptions", options);
        resolve();
      });
    }
  }
};
