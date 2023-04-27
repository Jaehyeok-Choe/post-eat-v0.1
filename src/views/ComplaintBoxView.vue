<template>
  <div class="complaint-box">
    <!-- page title -->
    <div class="title has-text-centered text-h4 font-weight-bold mt-8">Bamboo Forest</div>
    <form @submit.prevent="addComplaint">
      <!-- input -->
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newComplaintContent"
            class="input"
            type="text"
            placeholder="Make your voice heard :)"
          />
        </p>
        <!-- add button -->
        <p class="control">
          <button class="button is-info" :disabled="!newComplaintContent || !storeUserStatus.email">
            Add
          </button>
        </p>
      </div>
    </form>

    <ComplaintCard />
  </div>
</template>

<script setup>
/* 
  imports
*/

import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Swal from 'sweetalert2'
import ComplaintCard from '@/components/complaint-box/ComplaintCard.vue'
import { useUserStatusStore } from '../stores/userStatus'

/*
  pinia
*/

const storeUserStatus = useUserStatusStore()

/*
  get current date
*/

const date = new Date()
let year = date.getFullYear()
let month = ('0' + (date.getMonth() + 1)).slice(-2)
let day = ('0' + date.getDate()).slice(-2)
let yyyymmdd = Number(year + month + day)

/*
  firebase refs
*/

const complaintsCollectionRef = collection(db, 'complaints')

/*
  add complaint
*/

const newComplaintContent = ref('')

const addComplaint = () => {
  if (newComplaintContent.value.length > 200) {
    Swal.fire({ text: '200자 이내로 작성해 주시기 바랍니다' })
    return false
  } else if (newComplaintContent.value.length < 1) {
    Swal.fire({ text: '수정할 내용이 없습니다' })
    return false
  } else {
    addDoc(complaintsCollectionRef, {
      content: newComplaintContent.value,
      star: 0,
      commentView: 0,
      dateCreated: Date.now(),
      userid: storeUserStatus.email,
      dateYYYYMMDD: yyyymmdd
    })
  }
  newComplaintContent.value = ''
}
</script>

<style>
@import 'bulma/css/bulma.min.css';
.complaint-box {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>
