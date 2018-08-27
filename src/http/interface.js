import axios from "./api";

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将URL独立成文件，接口分成不同的模块
 */

let domain = document.domain;
let market_id = 12555;

// let urlBase = ''
switch (domain) {
  case "127.0.0.1":
  case "localhost":
    // urlBase = 'http://localhost:3000/index'
    break;
  default:
    break;
}

// 获取场馆
export const getMarketList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/init/mark/query",
    method: "post",
    data
  });
};

// 获取商场建筑物
export const getOrgList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getshoporg",
    method: "post",
    data
  });
};

// 获取楼层
export const getFloorList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getshopfloor",
    method: "post",
    data
  });
};

// 获取节假日
export const getHolidayList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getholiday",
    method: "post",
    data
  });
};

// 获取活动
export const getActivityList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getactivity",
    method: "post",
    data
  });
};

// 获取店铺
export const getShopList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getshopname",
    method: "post",
    data
  });
};

// 获取业态
export const getBizcatList = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getshopbizcat",
    method: "post",
    data
  });
};

// 获取概览表格
export const getOverviewCur = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/overview/query",
    method: "post",
    data
  });
};

// 获取概览历史图表
export const getOverviewHistory = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/overview/queryhistory",
    method: "post",
    data
  });
};

// -----------------------------------------------
// 获取活动效果分析表格
export const getActivityT1 = (data = {}) => {
  return axios({
    url: "/bi/marketing/acivity/text1/query",
    method: "post",
    data
  });
};

// 获取活动效果分析数据表格
export const getActivityT2 = (data = {}) => {
  return axios({
    url: "/bi/marketing/acivity/text2/query",
    method: "post",
    data
  });
};

// 获取活动效果分析数据表格
export const getActivityChart = (data = {}) => {
  return axios({
    url: "/bi/marketing/acivity/chart/query",
    method: "post",
    data
  });
};


//====================  系统设置   =========================
// 获取动作配置
export const getMarketActions = (data = {}) => {
  return axios({
    url: "bi/marketing/getmarketaction",
    method: "post",
    data
  });
};

// 新建动作配置
export const addMarketAction = (data) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/insetmarketaction",
    method: "post",
    data: data
  });
};

// 修改动作配置
export const updateMarketAction = (data) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/updatemarketaction",
    method: "post",
    data
  });
};

// 删除动作配置
export const deleteMarketAction = (data = {}) => {
  return axios({
    url: "bi/marketing/delmarketaction",
    method: "post",
    data
  });
};

// 获取营销成本
export const getActivityCost = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/getactivitycost",
    method: "post",
    data
  });
};

// 增加营销成本
export const addActivityCost = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/insetactivitycost",
    method: "post",
    data
  });
};

// 修改营销成本
export const updataActivityCost = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/updataactivitycost",
    method: "post",
    data
  });
};

// 删除营销成本
export const delActivitycost = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/delactivitycost",
    method: "post",
    data
  });
};


// 系统配置 指标维度
export const getSysLevels = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "bi/marketing/sys",
    method: "post",
    data
  });
};

// 系统配置 应用指标维度
export const insertSysLevels = (data = {}) => {
  return axios({
    url: "bi/marketing/insertsys",
    method: "post",
    data
  });
};

//=================    券效果分析   ===========================

export const getConponEffect = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/conpon/effect/query",
    method: "post",
    data
  });
};

export const getConponBizcat = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/conpon/bizcat/query",
    method: "post",
    data
  });
};

export const getConponChk = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/conpon/chk/query",
    method: "post",
    data
  });
};

export const getConponTop10 = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/conpon/top10/query",
    method: "post",
    data
  });
};


// ====================   会员分析   =========================

export const getMemberNumber = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/member/number/query",
    method: "post",
    data
  });
};

export const getMemberActivity = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/member/activity/query",
    method: "post",
    data
  });
};

export const getMemberQrcord = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/member/qrcord/query",
    method: "post",
    data
  });
};

export const getMemberSourcesAct = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/member/sourcesAct/query",
    method: "post",
    data
  });
};

export const getMemberSourcesChnnl = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/member/sourcesChnnl/query",
    method: "post",
    data
  });
};

export const getMemberDist = (data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: "/bi/marketing/member/dist/query",
    method: "post",
    data
  });
};

export const dataDownload = (name, data = {}) => {
  data = {market_id, ...data}
  return axios({
    url: `/bi/marketing/${name}/data/download`,
    method: "post",
    data
  });
};


export default {
  getFloorList,
  getHolidayList,
  getShopList,
  getOverviewCur,
  getOverviewHistory,
  getOrgList,
  getActivityList,
  getBizcatList,
  getActivityT1,
  getActivityT2,
  getActivityChart,
  getMarketActions,
  addMarketAction,
  updateMarketAction,
  deleteMarketAction,
  getSysLevels,
  getConponEffect,
  getConponBizcat,
  getConponChk,
  getConponTop10,
  getActivityCost,
  addActivityCost,
  updataActivityCost,
  delActivitycost,
  insertSysLevels,
  getMemberNumber,
  getMemberActivity,
  getMemberQrcord,
  getMemberSourcesAct,
  getMemberSourcesChnnl,
  getMemberDist,
  dataDownload
};
