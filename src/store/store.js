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
    },
    updateLevels(state, levels) {
      state.levels = levels;
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
        $api.getBizcatList({org_id: '01'})
      ]);

      let options = {
        building: buildingList,
        floor: floorList,
        bizcat: bizcatList,
        shop: shopList,
        activity: activityList
      };

      return new Promise((resolve, reject) => {
        this.commit("updateOptions", options);
        resolve();
      });
    },
    async getLevels({commit}, param) {
      await $api.getSysLevels({}).then(res => {
        let [overview, coupon, activityL1, activityL2] = [
          res.filter(item => item.dim_grp === "sale.overview"),
          res.filter(item => item.dim_grp === "sale.coupon"),
          res.filter(item => item.dim_grp === "sale.activity.1"),
          res.filter(item => item.dim_grp === "sale.activity.2")
        ];
        return new Promise((resolve, reject) => {
          this.commit("updateLevels", {overview, coupon, activityL1, activityL2});
          resolve();
        });
      });
    }
  }
};
