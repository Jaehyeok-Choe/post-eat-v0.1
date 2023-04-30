<template>
  <v-container>
    <!-- upload meal plan button -->
    <v-row justify="center" class="mt-15 mb-5">
      <v-btn
        :to="{ name: 'uploadMealPlan' }"
        width="200"
        height="70"
        density="compact"
        color="primary"
        x-large
        >meal-plan</v-btn
      >
    </v-row>
    <!-- upload cafe menu button -->
    <v-row justify="center" class="mb-5">
      <v-btn
        :to="{ name: 'uploadCafeMenu' }"
        width="200"
        height="70"
        density="compact"
        color="primary"
        x-large
        >cafe-menu</v-btn
      >
    </v-row>
    <v-row justify="center" class="mb-15">
      <SignoutButton />
    </v-row>
  </v-container>
</template>
<script setup>
/*
  imports
*/
// import { useUserStatusStore } from '../stores/userStatus'
import SignoutButton from '../components/SignoutButton.vue'

/*
  pinia
*/
// const storeUserStatus = useUserStatusStore()
</script>
