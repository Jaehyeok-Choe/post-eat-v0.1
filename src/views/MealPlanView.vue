<template>
  <br />
  <v-file-input
    label="File input"
    variant="underlined"
    accept="image/png, image/jpeg, image/bmp"
    @change="onFilePicked"
  ></v-file-input>

  <div v-if="imageUrl">
    <h1>&nbsp;&nbsp;Image Preview</h1>

    <v-img :src="imageUrl"></v-img><br />
    <v-btn @click="uploadImg()">upload</v-btn>
    <br /><br />
  </div>

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
  import
*/

import { ref } from 'vue'

/*
  get file
*/

const imageUrl = ref('')
const image = ref('')

const onFilePicked = (event) => {
  const files = event.target.files
  let filename = files[0].name
  if (filename.lastIndexOf('.') <= 0) {
    return alert('Please add a valid file!')
  }
  const fileReader = new FileReader()

  fileReader.addEventListener('load', () => {
    imageUrl.value = fileReader.result
  })
  fileReader.readAsDataURL(files[0])
  image.value = files[0]
}
</script>
<style scoped></style>
