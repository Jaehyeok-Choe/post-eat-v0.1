<template>
  <!-- show image -->
  <h1>&nbsp;&nbsp;Image View</h1>
  <v-card>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
      <v-card-title class="text-white">test</v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
/*
  imports
*/
// import { useRouter } from 'vue-router'

// const router = useRouter()
// router.go()
</script>
<style scoped></style>
