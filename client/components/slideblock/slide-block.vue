<template>
  <div class = "wrap">
    <div class="tool-bar">
      <span @click = "prevSlide">&lt;</span>
      <span @click = "nextSlide">&gt;</span>
    </div>
    <div class="content" :style = "{width:cwidth, left:cleft}">
        <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SlideBlock',
    data () {
      return {
        slideCount: 0,
        slideWidth: 0,
        index: 0
      }
    },
    methods: {
      // consoleNext () {
      //   console.log(this.index)
      // },
      nextSlide () {
        if (this.index + 1 === this.slideCount) {
          this.index = 0
        } else {
          this.index += 1
        }
      },
      prevSlide () {
        if (this.index === 0) {
          this.index = this.slideCount - 1
        } else {
          this.index -= 1
        }
      }
    },
    computed: {
      cwidth () {
        return this.slideCount * this.slideWidth + 'px'
      },
      cleft () {
        return -this.index * this.slideWidth + 'px'
      }
    },
    mounted () {
      const awidth = this.$el.offsetWidth
      const slids = this.$el.querySelectorAll('.slide')
      const slidLength = slids.length
      slids.forEach(slide => {
        slide.setAttribute('style', 'width:' + awidth + 'px;')
      })
      this.slideCount = slidLength
      this.slideWidth = awidth
    }
  }
</script>

<style lang="scss" scoped>
  .wrap{
    width:300px;
    overflow: hidden;
    .tool-bar{
      background:#bbb;
      text-align:right;
      span{
        line-height:30px;
        margin-right:20px;
        cursor:pointer;
      }
    }
    .content{
      position:relative;
      height:10px;
      transition: left 0.6s ease-in-out;
      .slide{
        float:left;
        display:block;
      }
    }
  }
</style>
