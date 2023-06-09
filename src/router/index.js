import { createRouter, createWebHistory } from 'vue-router'
import MealPlanView from '@/views/MealPlanView.vue'
import ComplaintBoxView from '@/views/ComplaintBoxView.vue'
import CafeView from '@/views/CafeView.vue'
import AdminPageView from '@/views/AdminPageView.vue'
import UploadMealPlan from '@/components/meal-plan/UploadMealPlan.vue'
import UploadCafeMenu from '@/components/cafe-menu/UploadCafeMenu.vue'
import SignupPageView from '@/views/SignupPageView.vue'
import LoginPageView from '@/views/LoginPageView.vue'
import MyPageView from '@/views/MyPageView.vue'
import Swal from 'sweetalert2'
import { useUserStatusStore } from '../stores/userStatus'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NotFoundView from '@/views/NotFoundView.vue'

/*
  router
*/

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
      component: AdminPageView,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        const storeUserStatus = useUserStatusStore()
        const userEmail = storeUserStatus.email
        const adminOne = 'tbeben77@gmail.com'
        const adminTwo = 'abcmarket@abc.com'
        if (userEmail === adminOne || userEmail === adminTwo) {
          next()
        } else {
          next('/404')
        }
      }
    },
    {
      path: '/member',
      name: 'member',
      component: MyPageView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPageView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPageView
    },
    {
      path: '/uploadMealPlan',
      name: 'uploadMealPlan',
      component: UploadMealPlan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/uploadCafeMenu',
      name: 'uploadCafeMenu',
      component: UploadCafeMenu,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/:pathMatch(.*)*',
      name: '/404',
      component: NotFoundView
    }
  ]
})

/*
  VUE-ROUTER NAVIGATION GUARDS!!
*/
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      Swal.fire('Access Denied', 'you are not a member', 'error')
      next('/')
    }
  } else {
    next()
  }
})

export default router
