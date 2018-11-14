const send = require('koa-send')
const Router = require('koa-router')

const router = new Router({ prefix: '/public' })
router.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = router
