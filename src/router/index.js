import { createRouter, createWebHistory } from 'vue-router'
import RestaurantView from '../views/RestaurantView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'restaurant',
      component: RestaurantView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cafe',
      name: 'cafe',
      component: () => import('../views/CafeView.vue')
    }
  ]
})

export default router
