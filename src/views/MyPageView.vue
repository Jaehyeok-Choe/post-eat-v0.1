<template>
  <v-card
    class="mx-auto mt-15"
    max-width="344"
    height="605"
    variant="outlined"
    image="https://picsum.photos/1920/1080?random"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">Hello!</div>
        <div class="text-h6 mb-5">You are a {{ storeUserStatus.status }}</div>
        <div class="text-caption">
          Don't think yourself as an ugly person <br />but as a beautiful monkey
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn block class="me-4 mt-15" type="submit" color="red" variant="flat" size="x-large">
        <SignoutButton />
      </v-btn>
    </v-card-actions>
  </v-card>
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
