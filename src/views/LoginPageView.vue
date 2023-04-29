<template>
  <v-card class="mx-auto mt-15" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">WELCOME</div>
        <div class="text-h6 mb-1">LOG IN</div>
        <div class="text-caption">
          Not a member? <router-link :to="{ name: 'signup' }">Sign up</router-link>
        </div>
      </div>
    </v-card-item>
    <v-card-item>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="e-mail"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="password"
        ></v-text-field>
        <v-card-actions class="justify-center">
          <v-btn class="me-4 mb-5" type="submit" color="success"> login </v-btn>
          <v-btn @click="handleReset" class="mb-5" color="warning"> clear </v-btn>
        </v-card-actions>
      </form>
    </v-card-item>
  </v-card>
</template>
<script setup>
import { useField, useForm } from 'vee-validate'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useUserStatusStore } from '../stores/userStatus'

/*
pinia
*/
const storeUserStatus = useUserStatusStore()

/*
  form
*/
const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email(value) {
      if (/^[a-zA-Z0-9+-\]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(value)) return true

      return '올바른 이메일 형식이 아닙니다'
    },
    password(value) {
      if (value?.length >= 8) return true

      return '올바른 비밀번호 형식이 아닙니다'
    }
  }
})

const email = useField('email')
const password = useField('password')
const errMsg = ref('')
const auth = getAuth()
// const router = useRouter()
const submit = handleSubmit((values) => {
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
      // get user email from sotres/userStatus.js
      storeUserStatus.setUser()

      const userEmail = user.email
      const adminOne = 'tbeben77@gmail.com'
      const adminTwo = 'a'
      if (userEmail === adminOne || userEmail === adminTwo) {
        location.href = '/admin'
      } else {
        location.href = '/member'
      }
    })
    .catch((error) => {
      const errorCode = error.code

      switch (errorCode) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that eamil was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
      }

      Swal.fire('Who are you?', errMsg.value, 'question')
    })
})
</script>
