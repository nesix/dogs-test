import Vue from 'vue'
import VueRouter from 'vue-router'

import Dogs from '../views/Dogs.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue'),
      pathToRegexpOptions: { strict: true },
    },
    {
      path: '/:breedId?',
      name: 'dogs',
      props: true,
      component: Dogs,
      pathToRegexpOptions: { strict: true },
    },
    {
      path: '*',
      redirect: {name: 'dogs'},
    },
  ]
})

export default router
