<template>
  <div class="text-center text-h4 font-weight-bold mt-7">Upload Meal Plan</div>
  <v-file-input
    class="mt-5"
    label="File input"
    variant="underlined"
    accept="image/png, image/jpeg, image/bmp"
    @change="onFilePicked"
  ></v-file-input>

  <div v-if="imageUrl" class="text-center">
    <h1 class="mb-2 font-italic">- Image Preview -</h1>

    <v-img :src="imageUrl"></v-img><br />
    <v-btn @click="uploadImg()" color="info">upload</v-btn>
    <br /><br />
  </div>
</template>

<script setup>
/*
  import
*/

import { ref } from 'vue'
import Swal from 'sweetalert2'

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

/*
  upload image
*/

const uploadImg = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    }
  })
}
</script>
<style scoped></style>
