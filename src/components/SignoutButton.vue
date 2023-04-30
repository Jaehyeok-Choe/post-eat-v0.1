<template lang="">
  <div>
    <v-btn
      @click="handleSignOut"
      width="200"
      height="70"
      density="compact"
      x-large
      v-if="isLoggedIn"
      >Sign out</v-btn
    >
  </div>
</template>
<script setup>
/*
  imports
*/
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useUserStatusStore } from '../stores/userStatus'

/*
  pinia
*/
const storeUserStatus = useUserStatusStore()

/*
sign out process
*/
const isLoggedIn = ref(false)

let auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  storeUserStatus.resetUser()
  signOut(auth).then(() => {
    location.href = '/login'
  })
}
</script>
<style lang=""></style>
