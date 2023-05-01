<template>
  <!-- show image -->
  <h1>&nbsp;&nbsp;Enjoy your meal :)</h1>
  <v-card>
    <v-img
      :src="url"
      class="align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="700px"
      cover
    >
      <v-card-title class="text-white"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { storage } from '../firebase'
import { ref, getDownloadURL } from 'firebase/storage'

export default {
  data: () => {
    return {
      url: '',
      path: 'mealPlan/meal-plan.jpg'
    }
  },

  mounted() {
    getDownloadURL(ref(storage, this.path)).then((download_url) => (this.url = download_url))
  }
}
</script>
<style scoped></style>
