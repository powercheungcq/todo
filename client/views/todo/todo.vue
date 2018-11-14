<template lang="html">
  <section class="real-app">
    <Tabs :value = "filter" @onChange = "handleChange">
      <Tab v-for = "item in filterList" :index = "item" :key = "item" :label = "item"></Tab>
    </Tabs>
    <input
     type="text"
     class="add-input"
     autofocus="autofocus"
     placeholder="接下来要做什么？"
     @keyup.enter = "handleTodo"
      >
      <item
       v-for = "todo in activedTodos"
       :todo = "todo"
       :key = "todo.id"
       @deleteTo = "deleteById"
       @toggle="handleUpdateTodo"
       />
      <Quey
      :todos = "todos"
      :filter = "filter"
      @tabs = "tabsFilter"
      @clearAllCompleted = "clearAllCompleted"
      />
  </section>
</template>

<script>
  import {
    mapState, mapActions
  } from 'vuex'
  import item from './item.vue'
  import Quey from './helper.vue'
  export default {
    metaInfo: {
      title: 'The Todo App'
    },
    // beforeRouteEnter (to, from, next) {
    //   console.log('todo before Route Enter')
    //   next(vm => {
    //     if (vm.$attrs.id === '123') {
    //       vm.$data.filter = 'active'
    //     }
    //   })
    // },
    // beforeRouteUpdate (to, from, next) {
    //   console.log('todo before Route Update ', to, this)
    //   if (to.params.id === '123') {
    //     this.filter = 'all'
    //   } else {
    //     this.filter = 'active'
    //   }
    //
    //   next()
    // },
    // beforeRouteLeave (to, from, next) {
    //   console.log('todo before route leave')
    //   if (global.confirm('are you sure?')) {
    //     next()
    //   }
    // },
    data () {
      return {
        filter: 'all',
        filterList: ['all', 'active', 'completed']
      }
    },
    mounted () {
      this.fetchTodos()
    },
    computed: {
      ...mapState(['todos']),
      activedTodos () {
        if (this.filter === 'active') {
          return this.todos.filter(todo => todo.completed === false)
        } else if (this.filter === 'completed') {
          return this.todos.filter(todo => todo.completed === true)
        } else {
          return this.todos
        }
      }
    },
    methods: {
      ...mapActions(['fetchTodos', 'addTodo', 'updateTodo', 'deleteTodo', 'deleteAllCompleted']),
      handleUpdateTodo (todo) {
        this.updateTodo(todo)
      },
      handleChange (index) {
        this.filter = index
      },
      handleTodo: function (e) {
        this.addTodo({ content: e.target.value, completed: false })
        // this.id = this.id + 1
        // this.todos.unshift({ id: this.id, content: e.target.value, completed: false })
        // this.$axios.post('/api/todo/', { content: e.target.value, completed: false })
        e.target.value = ''
      },
      tabsFilter (state) {
        this.filter = state
      },
      clearAllCompleted () {
        const completedTodo = this.todos.filter(item => item.completed)
        let ids = []
        completedTodo.forEach((item) => {
          ids.push(item.id)
        })
        this.deleteAllCompleted(ids)
      },
      deleteById (id) {
        this.deleteTodo(id)
      }
    },
    components: { item, Quey }
  }
</script>

<style lang="scss">
.real-app{
  width:600px;
  margin:0 auto;
  box-shadow: 0 0 5px #666;
  .add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size:24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border:0;
    outline: none;
    color: inherit;
    padding:6px;
    border: 1px solid #999;
    box-sizing: border-box;
    font-smoothing:antialiased;
    padding:16px 16px 16px 60px;
    border:none;
    box-shadow:inset 0 -2px 1px rgba(0,0,0,0.04);
  }
}
</style>
