<template>
  <transition name = "fade" @after-leave = "afterLeave" @after-enter = "afterEnter">
  <div
    v-show = "isVisible"
    class="notification"
    @mouseenter = "clearTimer"
    @mouseleave = "createTimer"
    :style = "style">
    <span class ="content">{{content}}</span>
    <a href="" class = "btn" @click = "handleClose">{{btn || '关闭'}}</a>
  </div>
  </transition>
</template>

<script>
  export default {
    name: 'Notification',
    props: {
      content: {
        type: String,
        required: true
      },
      btn: {
        type: String,
        default: '关闭'
      }
    },
    computed: {
      style () {
        return {}
      }
    },
    data () {
      return {
        isVisible: false
      }
    },
    methods: {
      handleClose: function (e) {
        e.preventDefault()
        this.$emit('close')
      },
      afterLeave () {
        this.$emit('closed')
      },
      clearTimer () {},
      createTimer () {}
    }
  }
</script>
<style lang="scss">
  .notification{
    display: flex;
    background-color:#303030;
    color:#fff;
    align-items: center;
    padding:20px;
    flex-wrap: wrap;
    position: fixed;
    min-width: 280px;
    box-shadow: 0 5px 3px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.2);
    transition: all .3s;
    .content{
      padding:0;
    }
    .btn{
      cursor:pointer;
      color:#ff4081;
      padding-left:24px;
      margin-left:auto;
    }
  }
</style>
