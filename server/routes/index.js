var Router = require("koa-router");
var Mock = require("mockjs");
var router = new Router();

const Random = Mock.Random;

router.prefix("/index");

router.get("/floor", async (ctx, next) => {
  const produceNewsData = function() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      let newArticleObject = {
        id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        market_id: Random.natural(), // 返回一个随机的自然数（大于等于 0 的整数）
        biacat_name: Random.cname(),
        floorName: Random.cname(),
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

module.exports = router;
