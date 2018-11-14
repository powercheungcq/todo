const axios = require('axios')
const { createError } = require('./util')

const request = axios.create({
  baseUrl: '/'
})

const handleRquest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data && !data.success) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, resp.message))
      } else {
        reject(createError(resp.status, resp.message))
      }
    })
  })
}

export default {
  getAllTodos () {
    return handleRquest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRquest(request.post('user/login', { username, password }))
  },
  pushTodo (todo) {
    return handleRquest(request.post('/api/todo', todo))
  },
  updateTodo (todo) {
    return handleRquest(request.put(`/api/todo/${todo.id}`, { content: todo.content, completed: todo.completed }))
  },
  deleteTodoById (id) {
    return handleRquest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompletedTodo (ids) {
    return handleRquest(request.post('/api/todos', { ids }))
  }
}
