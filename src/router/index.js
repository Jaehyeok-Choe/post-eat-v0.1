import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import ComplaintBoxView from '@/views/ComplaintBoxView.vue'
import CafeView from '@/views/CafeView.vue'
import AdminPage from '@/components/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/complaintbox',
      name: 'complaintbox',
      component: ComplaintBoxView
    },
    {
      path: '/cafe',
      name: 'cafe',
      component: CafeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    }
  ]
})

export default router
