import slideBlock from './slide-block.vue'
import slide from './slide.vue'

export default (Vue) => {
  Vue.component(slideBlock.name, slideBlock)
  Vue.component(slide.name, slide)
}
