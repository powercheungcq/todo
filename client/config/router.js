import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    mode: 'history',
    routes,
    // base: '/base/'
    // linkActiveClass: 'menu-active',
    // linkExactActiveClass: 'aaa',
    // scrollBehavior (to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return { x: 0, y: 0 }
    //   }
    // },
    // parseQuery (query) {
    //
    // },
    // stringifyQuery (obj) {
    //
    // },
    fallback: true
  })
}
