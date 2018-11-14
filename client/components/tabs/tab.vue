<script>
  export default {
    name: 'Tab',
    props: {
      index: {
        type: [String, Number],
        required: true
      },
      label: {
        type: String,
        default: 'tab'
      }
    },
    mounted () {
      this.$parent.panes.push(this)
    },
    // inject: ['data', 'handleChange'],
    computed: {
      isActive () {
        // return this.data.value === this.index
        return this.$parent.value === this.index
      }
    },
    methods: {
      handleClick () {
        // this.handleChange(this.index)
        this.$parent.handleChange(this.index)
      }
    },
    render () {
      const className = {
        tab: true,
        active: this.isActive
      }
      const lab = this.$slots.label || <span>{this.label}</span>
      return (
        <li class = {className} onClick = {this.handleClick}>
          {lab}
        </li>
      )
    }
  }
</script>

<style scoped lang="scss">
  .active{
    position: relative;
  }
  .active::after{
    content: "";
    width:80%;
    border-bottom:2px solid rgb(10,120,255);
    position:absolute;
    display:block;
    box-sizing:border-box;
    bottom:-2px;
    left:0;
    right:0;
    margin:auto;
  }
</style>
