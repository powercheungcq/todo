import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (err) => {
  if (err.code === 401) {
    notify({
      content: '需要先登录哟'
    })
    bus.$emit('auth')
  } else {
    notify({
      content: err.message
    })
  }
}

export default {
  countPlusa: function (context, num) {
    setTimeout(() => {
      context.commit('countPlus', num)
    }, 1000)
  },
  fetchTodos: ({ commit }) => {
    commit('startLoading')
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  addTodo: ({ commit }, todo) => {
    commit('startLoading')
    model.pushTodo(todo)
      .then(data => {
        commit('pushTodo', data)
        notify({
          content: `添加成功一件事情`
        })
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  updateTodo: ({ commit }, todo) => {
    commit('startLoading')
    todo.completed = !todo.completed
    model.updateTodo(todo)
      .then(data => {
        commit('gxTodo', data)
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteTodo: ({ commit }, id) => {
    commit('startLoading')
    model.deleteTodoById(id)
      .then(() => {
        commit('delTodo', id)
        notify({
          content: `删除成功`
        })
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteAllCompleted: ({ commit }, ids) => {
    commit('startLoading')
    model.deleteAllCompletedTodo(ids)
      .then((data) => {
        commit('delCompletedTodo')
        notify({
          content: `成功删除${data.length}已完成事件`
        })
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  }
}
