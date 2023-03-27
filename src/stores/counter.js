import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  actions: {
    countIncrease() {
      this.count++
    },
    countDecrease() {
      this.count--
    }
  }
})
