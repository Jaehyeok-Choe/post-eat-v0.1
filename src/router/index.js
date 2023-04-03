import { createRouter, createWebHistory } from 'vue-router'
import RestaurantView from '../views/RestaurantView.vue'
import AdminPage from '@/components/AdminPage.vue'
import MenuView from '@/views/MenuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'restaurant',
      component: RestaurantView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/cafe',
      name: 'cafe',
      component: () => import('../views/CafeView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    }
  ]
})

export default router
