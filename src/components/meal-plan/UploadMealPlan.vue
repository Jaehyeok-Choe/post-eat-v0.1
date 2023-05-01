<template>
  <v-card class="mx-auto mt-15" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">WELCOME</div>
        <div class="text-h6 mb-1">Meal Plan</div>
        <div class="text-caption">Upload Meal-plan</div>
      </div>
    </v-card-item>
    <v-card-item>
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
        <br /><br /></div
    ></v-card-item>
  </v-card>
</template>

<script>
/*
  import
*/
import Swal from 'sweetalert2'
import { storage } from '../../firebase'
import { ref, uploadBytes } from 'firebase/storage'
// import MealPlanCard from './MealPlanCard.vue'

export default {
  // components: {
  //   MealPlanCard
  // },
  data() {
    return {
      imageUrl: '',
      image: null,
      showMealPlanCard: false
    }
  },
  methods: {
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },

    /*
      upload image
    */

    uploadImg() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Uploaded!', 'Your file has been uploaded.', 'success')
          // firebase upload image
          const storageRef = ref(storage, 'mealPlan/meal-plan.jpg')
          uploadBytes(storageRef, this.image).then(
            console.log('uploading success!'),
            this.$router.push('/admin')
          )
        }
      })
    }
  }
}
</script>
<style scoped></style>
