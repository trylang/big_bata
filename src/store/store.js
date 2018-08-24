import Vue from "vue";
// console.log(Vue.prototype) //undefined
import $api from "@/http/interface.js";
import dayjs from 'dayjs'

export default {
  state: {
    // 筛选框参数
    searchParam: {
      start_date: dayjs(new Date())
      .subtract(1, "month")
      .format("YYYY-MM-DD"),
      end_date: dayjs(new Date()).format("YYYY-MM-DD"),
      org_id: '01',
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
        $api.getFloorList({org_id: '01'}),
        $api.getOrgList({org_id: '01'}),
        $api.getShopList({org_id: '01'}),
        $api.getActivityList({org_id: '01'}),
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
