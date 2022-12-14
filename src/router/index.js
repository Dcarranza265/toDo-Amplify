import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'Auth',
    component: Auth
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    try{
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next()
    } catch (error){
      next({path: "/"})
    }
  }
  next();
})

export default router
