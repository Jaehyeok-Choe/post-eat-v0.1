import { createRouter, createWebHistory } from 'vue-router'
import MealPlanView from '@/views/MealPlanView.vue'
import ComplaintBoxView from '@/views/ComplaintBoxView.vue'
import CafeView from '@/views/CafeView.vue'
import AdminPage from '@/components/AdminPage.vue'
import UploadMealPlan from '@/components/meal-plan/UploadMealPlan.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mealPlanView',
      component: MealPlanView
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
    },
    {
      path: '/uploadMealPlan',
      name: 'uploadMealPlan',
      component: UploadMealPlan
    }
  ]
})

export default router
