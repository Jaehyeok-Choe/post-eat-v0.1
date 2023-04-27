<template>
  <v-container>
    <v-row justify="center" class="mt-15 mb-15">
      <v-btn
        :to="{ name: 'uploadMealPlan' }"
        width="200"
        height="70"
        density="compact"
        color="primary"
        x-large
        >&nbsp;&nbsp;&nbsp;upload <br />meal-plan</v-btn
      >
    </v-row>
    <v-row justify="center" class="mb-15">
      <SignoutButton />
    </v-row>
    <v-row justify="center" class="mb-5">
      <v-btn width="200" height="70" density="compact">n/a</v-btn>
    </v-row>
  </v-container>
</template>
<script setup>
/*
  imports
*/
// import { useUserStatusStore } from '../stores/userStatus'
import SignoutButton from './SignoutButton.vue'

/*
  pinia
*/
// const storeUserStatus = useUserStatusStore()
</script>
