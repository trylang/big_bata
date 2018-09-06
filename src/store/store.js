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
      org_id: null,
      region_id: "1",
      stat_type: '当周',
      current_date: dayjs()
            .subtract(1, "day")
            .format("YYYY-MM-DD")
    },
    overview: [],
    activityL1: [],
    activityL2: [],
    coupon: []
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
    },
    updateoverview(state, overview) {
      state.overview = overview;
    },
    updateactivity(state, activity) {
      state.activity = activity;
    },
    updateactivityL1(state, activityL1) {
      state.activityL1 = activityL1;
    },
    updateactivityL2(state, activityL2) {
      state.activityL2 = activityL2;
    },
    updatecoupon(state, coupon) {
      state.coupon = coupon;
    },
    updateSearchOptions(state, options) {
      state.searchOptions = options;
    },
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
        $api.getFloorList({org_id: '01', market_id: param.market_id}),
        $api.getOrgList({org_id: '01', market_id: param.market_id}),
        $api.getShopList({org_id: '01', market_id: param.market_id}),
        $api.getActivityList({org_id: '01', market_id: param.market_id}),
        $api.getBizcatList({org_id: '01', market_id: param.market_id})
      ]);

      let options = {
        region: [{region_name: '全部', region_id: "1"}, {region_name: '只看场馆', region_id: "2"}, {region_name: '只看店铺', region_id: "3"}, ],
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
      await $api.getSysLevels({market_id: param.market_id}).then(res => {
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
