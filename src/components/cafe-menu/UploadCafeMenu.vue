<template>
  <form>
    <v-text-field
      v-model="state.name"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      :counter="10"
      label="Name"
      required
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      :error-messages="v$.email.$errors.map((e) => e.$message)"
      label="E-mail"
      required
      @input="v$.email.$touch"
      @blur="v$.email.$touch"
    ></v-text-field>

    <v-select
      v-model="state.select"
      :items="items"
      :error-messages="v$.select.$errors.map((e) => e.$message)"
      label="Item"
      required
      @change="v$.select.$touch"
      @blur="v$.select.$touch"
    ></v-select>
    <!-- buttons -->
    <v-container>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn @click="v$.$validate" type="submit" class="mt-2 mb-2">submit</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="clear" class="mt-2">clear</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>
<script>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

export default {
  setup() {
    const initialState = {
      name: '',
      email: '',
      select: null
    }

    const state = reactive({
      ...initialState
    })

    const items = ref(['coffee', 'tea', 'juice', 'else'])

    const rules = {
      name: { required },
      email: { required, email },
      select: { required },
      items: { required }
    }

    const v$ = useVuelidate(rules, state)

    function clear() {
      v$.value.$reset()

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
      }
    }

    return { state, items, clear, v$ }
  }
}
</script>
<!-- <template>
  <div class="text-center text-h4 font-weight-bold mt-7">Upload Cafe Menu</div>
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
<style scoped></style> -->
