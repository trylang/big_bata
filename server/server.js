const Koa = require("koa");
const app = new Koa();
const routes = require('./routes/index');
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

// app.use(async ctx => {
//   ctx.body = "Hello World";
// });

app.use(routes.routes(), routes.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000);
console.log('监听端口号：3000');
