var Router = require("koa-router");
var Mock = require("mockjs");
var router = new Router();

const Random = Mock.Random;

router.prefix("/index");

router.get("/string", async (ctx, next) => {
  const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 10; i++) {
      let newArticleObject = {
        title: Random.csentence(5, 30),
        // Random.csentence( min, max )
        author: Random.cname()
        // Random.cname() 随机生成一个常见的中文姓名
      };
      articles.push(newArticleObject);
    }
    return { articles: articles };
  };
  let res = { status: 200, data: { list: await produceNewsData() } };
  ctx.body = res;
});
module.exports = router;
