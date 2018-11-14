import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.isVisible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  data () {
    return {
      verticalOffset: 0,
      height: 0
    }
  }
}
