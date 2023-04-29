import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useLocalStorage } from '@vueuse/core'

export const useUserStatusStore = defineStore({
  id: 'userStatus',
  state: () => ({
    email: useLocalStorage('eamil'),
    status: useLocalStorage('status')
  }),
  actions: {
    setUser() {
      let auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.email = user.email
        const adminOne = 'tbeben77@gmail.com'
        const adminTwo = 'abcmarket@abc.com'
        if (user.email === adminOne || user.email === adminTwo) {
          this.status = 'admin'
        } else if (user.email != '') {
          this.status = 'member'
        } else {
          this.status = 'visitor'
        }
      })
    },
    resetUser() {
      let auth = getAuth()
      onAuthStateChanged(auth, () => {
        localStorage.clear()
      })
    }
  }
})
