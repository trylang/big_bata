var Router = require("koa-router");
var Mock = require("mockjs");
var router = new Router();

const Random = Mock.Random;

router.prefix("/bi");

router.get("/floor", async (ctx, next) => {
  const produceNewsData = function() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      let newArticleObject = {
        id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        market_id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        biacat_name: Random.cname(),
        floor_name: Random.cname(),
        shop_name: Random.cname(),
        title: Random.csentence(5, 30),
        // Random.csentence( min, max )
        author: Random.cname()
        // Random.cname() 随机生成一个常见的中文姓名
      };
      list.push(newArticleObject);
    }
    return list;
  };
  let res = { status: 200, data: {list: await produceNewsData()} };
  ctx.body = res;
});

router.get("/holiday", async (ctx, next) => {
  const produceNewsData = function() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      let newArticleObject = {
        id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        market_id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        biacat_name: Random.cname(),
        floor_name: Random.cname(),
        holiday_name: Random.cname(),
        shop_name: Random.cname(),
        title: Random.csentence(5, 30),
        // Random.csentence( min, max )
        author: Random.cname()
        // Random.cname() 随机生成一个常见的中文姓名
      };
      list.push(newArticleObject);
    }
    return list;
  };
  let res = { status: 200, data: {list: await produceNewsData()} };
  ctx.body = res;
});

router.get("/shop", async (ctx, next) => {
  const produceNewsData = function() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      let newArticleObject = {
        id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        market_id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        biacat_name: Random.cname(),
        floor_name: Random.cname(),
        holiday_name: Random.cname(),
        shop_name: Random.cname(),
        title: Random.csentence(5, 30),
        // Random.csentence( min, max )
        author: Random.cname()
        // Random.cname() 随机生成一个常见的中文姓名
      };
      list.push(newArticleObject);
    }
    return list;
  };
  let res = { status: 200, data: {list: await produceNewsData()} };
  ctx.body = res;
});


router.get("/marketing/overview/current/query", async (ctx, next) => {
  const produceNewsData = function() {
    let list = [];
    for (let i = 0; i < 3; i++) {
      let newArticleObject = {
        "stat_ymd": Random.date('yyyy-MM-dd'),
        "video_cf": Random.natural(),
        "wifi_cf": Random.natural(),
        "sale_amout": Random.natural(),
        "sale_bills": Random.natural(),
        "act_uv": Random.natural(),
        "act_pv": Random.natural(),
        "rtg_members": Random.natural(),
        "rtg_members_new": Random.natural(),
        "coupon_ack": Random.natural(),
        "coupon_chk": Random.natural(),
        "coupon_chk_cost": Random.natural(),
        "acq_roi": Random.natural(),
        "holiday_name": Random.csentence(2, 5),
        "action_name": Random.csentence(2,6)
      };
      list.push(newArticleObject);
    }
    return list;
  };
  let res = { status: 200, data: {list: await produceNewsData()} };
  ctx.body = res;
});

router.get("/marketing/overview/queryhistory", async (ctx, next) => {
  const produceNewsData = function() {
    let list = [];
    for (let i = 0; i < 1; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '六一节',
        "zhoumo": '周末',
        "action_name": ''
      };
      list.push(newArticleObject);
    }

    for (let i = 1; i < 2; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '',
        "action_name": '搞活动',
        "zhoumo": '',
      };
      list.push(newArticleObject);
    }
    
    for (let i = 2; i < 3; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '',
        "zhoumo": '',
        "action_name": ''
      };
      list.push(newArticleObject);
    }

    for (let i = 3; i < 4; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '',
        "zhoumo": '周末',
        "action_name": ''
      };
      list.push(newArticleObject);
    }

    for (let i = 4; i < 6; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '端午节',
        "zhoumo": '周末',
        "action_name": ''
      };
      list.push(newArticleObject);
    }

    for (let i = 6; i < 7; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '',
        "zhoumo": '',
        "action_name": ''
      };
      list.push(newArticleObject);
    }
    for (let i = 7; i < 9; i++) {
      let newArticleObject = {
        "stat_ymd": `2018-08-0${i+1}`,
        "video_cf": Random.natural(1,10000),
        "wifi_cf": Random.natural(1,10000),
        "sale_amout": Random.natural(1,10000),
        "sale_bills": Random.natural(1,10000),
        "act_uv": Random.natural(1,10000),
        "act_pv": Random.natural(1,10000),
        "rtg_members": Random.natural(1,10000),
        "rtg_members_new": Random.natural(1,10000),
        "coupon_ack": Random.natural(1,10000),
        "coupon_chk": Random.natural(1,10000),
        "coupon_chk_cost": Random.natural(1,10000),
        "acq_roi": Random.natural(1,10000),
        "holiday_name": '七夕节',
        "zhoumo": '周末',
        "action_name": ''
      };
      list.push(newArticleObject);
    }
    return list;
  };
  let res = { status: 200, data: {list: await produceNewsData()} };
  ctx.body = res;
});

module.exports = router;
