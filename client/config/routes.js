import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/login',
    name: 'login',
    component: Login // () => import('../views/login/login.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo, // () => import('../views/todo/todo.vue'),
    props: true
    // ,
    // beforeEnter (to, from, next) {
    //   console.log('before enter')
    //   next()
    // }

  }
]
