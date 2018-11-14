const Koa = require('koa')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const path = require('path')
const send = require('koa-send')
const staticRouter = require('./router/static-router')
const apiRouter = require('./router/api-router')
const userRouter = require('./router/user')
const createDb = require('./db/db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()
app.keys = ['vue ssr demo']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))
const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})
// 添加ico文件
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', path.resolve(__dirname, '../'))
  } else {
    await next()
  }
})

app.use(koaBody())

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

let pageRouter

if (isDev) {
  pageRouter = require('./router/dev-ssr.js')
} else {
  pageRouter = require('./router/ssr.js')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
app.listen(PORT, HOST, () => {
  console.log('server listening on ' + HOST + ':' + PORT)
})
