const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async (ctx) => {
  const user = ctx.request.body
  if (user.username === 'power' && user.password === 'power123') {
    ctx.session.user = {
      username: user.username
    }
    ctx.body = {
      success: true,
      data: {
        username: user.username
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error.'
    }
  }
})
module.exports = userRouter
