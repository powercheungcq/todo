<template lang="html">
  <div class="helper">
    <span class="left">{{unCompleted}} items left</span>
    <!--<span class="tabs">-->
      <!--<span v-for="s in states" :key="s" :class="[s , filter === s ? 'actived' : ''] " @click = "toggleFilter(s)"> {{s}}</span>-->
    <!--</span>-->
    <span class="clear" @click = "clearAllCompleted">clear-completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    unCompleted () {
      return this.todos.filter(todo => todo.completed === false).length
    }
  },
  methods: {
    toggleFilter (state) {
      this.$emit('tabs', state)
    },
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>

<style lang="scss" scoped>
.helper{
  font-weight:100;
  display:flex;
  justify-content: space-between;
  padding:5px 0;
  line-height: 30px;
  background: #fff;
  font-size: 14px;
  font-smoothing:antialiased;
  width:600px;
  margin:0 auto;
}
.left,.clear,.tabs{
  padding:0 10px;
  box-sizing: border-box;
}
.left,.clear{
  width: 150px;
}
.left{text-align: left;}
.clear{
  text-align: right;
  cursor: pointer;
}
.tabs{
  width:200px;
  display:flex;
  justify-content: space-around;
  *{
    display: inline-block;
    padding:0 10px;
    cursor:pointer;
    border:1px solid rgba(175,47,47,0);
    &.actived{
      border-color: rgba(175,47,47,0.4);
      border-radius: 5px;
    }
  }
}
</style>
