import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vueRou from 'vue-router'
import './assets/scss/global.scss'
import vueRouter from './config/router.js'
import CreateStore from './store/store'

// const root = document.createElement('div')
// document.body.appendChild(root)

Vue.use(vueRou)
Vue.use(Vuex)


const router = vueRouter()
const store = CreateStore()

// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('count has chaged to:' + newCount)
// })

// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

// router.beforeEach(function (to, from, next) {
//   console.log('before Each invoked')
//   // if (to.fullPath === '/todo') {
//   //   next('/login')
//   // } else {
//   //   next()
//   // }
//   next()
// })
//
// router.beforeResolve((to, from, next) => {
//   console.log('before resolve invoked')
//   next()
// })
//
// router.afterEach((to, from, next) => {
//   console.log('after Each invoked')
// })
new Vue({
  el: '#root',
  store,
  router,
  render: h => h(App)
})
