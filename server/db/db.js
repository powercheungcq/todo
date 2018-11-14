const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

// 创建一个自定义错误
const createError = (errcode, errormsg) => {
  const err = new Error(errormsg.message)
  err.code = errcode
  return err
}

const handleRequest = ({ status, data, ...rest}) => {
  if(status === 200){
    return data
  } else {
    throw createError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      const filter = {
        'order': 'createdAt DESC'
      }
      return handleRequest(await request.get(`/${className}?filter=${encodeURIComponent(JSON.stringify(filter))}`, {
        headers: getHeaders()
      }))
    },
    async addTodo (todo) {
      return handleRequest(await request.post(
        `/${className}`,
        todo,
        { headers: getHeaders() }
      ))
    },
    async editTodo (id, todo) {
      return handleRequest(await request.put(
        `/${className}/${id}`,
        todo,
        { headers: getHeaders() }
      ))
    },
    async delTodo (id) {
      return handleRequest(await request.delete(
        `/${className}/${id}`,
        { headers: getHeaders() }
      ))
    },
    async delAllCompleted (ids) {
      const requests = ids.map(id => {
        return {
          'method': 'DELETE',
          'path': `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch',
        { requests },
        { headers: getHeaders() }
      ))
    }
  }
}
