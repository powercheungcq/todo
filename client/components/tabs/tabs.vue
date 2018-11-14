<script>
  import TabContainer from './tab-container.vue'

  export default {
    name: 'Tabs',
    components: {
      TabContainer
    },
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    // provide () {
    //   const data = {}
    //   Object.defineProperty(data, 'value', {
    //     get: () => this.value,
    //     enumerable: true
    //   })
    //   return {
    //     handleChange: this.handleChange,
    //     data
    //   }
    // },
    data () {
      return {
        panes: []
      }
    },
    methods: {
      handleChange (index) {
        this.$emit('onChange', index)
      }
    },
    render () {
      return (
        <div class = "tabs">
          <ul class = "tabs-header">
            {this.$slots.default}
          </ul>
          <tab-container panes={this.panes}></tab-container>
        </div>
      )
    }
  }
</script>

<style lang="scss" scoped>
  .tabs{
    background: #fff;
    ul{
      padding:0;
      margin:0;
      list-style: none;
      padding:5px 5px 0 5px;
      border-bottom: 2px solid #d9d9d9;
    }
    li{
      display:inline-block;
      padding:12px;
      font-size:16px;
      cursor:pointer;
      height:100%;
      box-sizing:border-box;
    }
  }

</style>
