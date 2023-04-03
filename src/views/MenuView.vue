<template>
  <v-file-input
    label="File input"
    variant="underlined"
    accept="image/png, image/jpeg, image/bmp"
    @change="onFilePicked"
  ></v-file-input>
  <div v-if="imageUrl">
    <v-img :src="imageUrl"></v-img>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
