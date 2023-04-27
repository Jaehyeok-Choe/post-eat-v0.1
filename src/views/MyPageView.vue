<template lang="">
  <div>
    <div><h1>My Page</h1></div>

    <div v-if="storeUserStatus.status === 'admin'">
      <div><h1>ADMIN PAGE</h1></div>
      <div>
        <h1>{{ storeUserStatus.email }}</h1>
      </div>
      <div>
        <h1>{{ storeUserStatus.status }}</h1>
      </div>
      <div><v-btn @click="handleSignOut" v-if="isLoggedIn">Sign out</v-btn></div>
    </div>
    <div v-else-if="storeUserStatus.status === 'member'">
      <div><h1>MEMBER PAGE</h1></div>
      <div>
        <h1>{{ storeUserStatus.status }}</h1>
      </div>
      <div><SignoutButton /></div>
    </div>
  </div>
</template>
<script setup>
/*
  imports
*/
import SignoutButton from '../components/SignoutButton.vue'
import { useUserStatusStore } from '../stores/userStatus'

/*
  pinia
*/
const storeUserStatus = useUserStatusStore()
</script>
<style lang=""></style>
