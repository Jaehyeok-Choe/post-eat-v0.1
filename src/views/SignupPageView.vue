<template>
  <v-card class="mx-auto mt-15" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">WELCOME</div>
        <div class="text-h6 mb-1">Sign Up</div>
        <div class="text-caption">Create an account</div>
      </div>
    </v-card-item>
    <v-card-item>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Enter your e-mail"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Enter password"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="confirmPassword.value.value"
          :error-messages="confirmPassword.errorMessage.value"
          label="Confirm password"
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="quiz.value.value"
          :error-messages="quiz.errorMessage.value"
          label="일층카페 아메리카노 라지 사이즈 가격은?"
        ></v-text-field>
        <v-card-actions class="justify-center">
          <v-btn class="me-4 mb-5" type="submit" color="success"> Join </v-btn>
          <v-btn @click="handleReset" class="mb-5" color="warning"> clear </v-btn>
        </v-card-actions>
      </form>
    </v-card-item>
  </v-card>
</template>
<script>
import { useField, useForm } from 'vee-validate'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { ref } from 'vue'

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-zA-Z0-9+-\]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(value)) return true

          return '올바른 이메일 형식이 아닙니다'
        },
        password(value) {
          if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value))
            return true

          return '최소 8자, 하나 이상의 문자, 숫자 및 특수 문자 포함'
        },
        confirmPassword(value) {
          if (value === password.value.value) return true

          return '비밀번호가 일치하지 않습니다'
        },
        quiz(value) {
          if (value == 1700) return true

          return '우정사업본부 직원이 아니시군요'
        }
      }
    })

    const email = useField('email')
    const password = useField('password')
    const confirmPassword = useField('confirmPassword')
    const quiz = useField('quiz')

    const errMsg = ref('')
    const router = useRouter()

    const submit = handleSubmit((values) => {
      createUserWithEmailAndPassword(getAuth(), values.email, values.password)
        .then((data) => {
          console.log(data)
          router.push('/login')
          Swal.fire({
            title: '회원가입 완료',
            text: '로그인 페이지로 이동',
            icon: 'success',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        })
        .catch((error) => {
          const errorCode = error.code

          switch (errorCode) {
            case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break

            default:
              errMsg.value = 'something wrong...'
          }

          Swal.fire('Error?', errMsg.value, 'error')
        })
    })

    return { email, password, confirmPassword, quiz, submit, handleReset }
  }
}
</script>
