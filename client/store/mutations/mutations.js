export default {
  countPlus: function (state, num) {
    state.count = state.count + num
  },
  fillTodos: (state, todos) => {
    state.todos = todos
  },
  pushTodo: (state, todo) => {
    let temp = state.todos
    temp.unshift(todo)
    state.todos = temp
  },
  gxTodo: (state, todo) => {
    let temp = state.todos
    const index = temp.findIndex(item => { return item.id === todo.id })
    temp.splice(index, 1, todo)
    state.todos = temp
  },
  delTodo: (state, id) => {
    let temp = state.todos
    const index = temp.findIndex(item => { return item.id === id })
    temp.splice(index, 1)
    state.todos = temp
  },
  delCompletedTodo: (state) => {
    let temp = state.todos
    temp = temp.filter(item => !item.completed)
    state.todos = temp
  },
  startLoading: state => {
    state.isLoading = true
  },
  endLoading: state => {
    state.isLoading = false
  }
}
