const Router =  require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

apiRouter.use(async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = {
      success: false,
      message: 'please login.'
    }
  } else {
    await next()
  }
})

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  .get('/todos', async (ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async (ctx) => {
    const todo = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(todo)
  })
  .put('/todo/:id', async (ctx) => {
    const todo = await ctx.db.editTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(todo)
  })
  .delete('/todo/:id', async (ctx) => {
    const todo = await ctx.db.delTodo(ctx.params.id)
    ctx.body = successResponse(todo)
  })
  .post('/todos', async (ctx) => {
    const todo = await ctx.db.delAllCompleted(ctx.request.body.ids)
    ctx.body = successResponse(todo)
  })

module.exports = apiRouter
