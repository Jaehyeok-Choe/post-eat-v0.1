<template>
  <div class="complaint-box">
    <!-- page title -->
    <div class="title has-text-centered">Complaint Box</div>
    <form @submit.prevent="addComplaint">
      <!-- input -->
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
            v-model="newComplaintContent"
            class="input"
            type="text"
            placeholder="What do people complain about?"
          />
        </p>
        <!-- add button -->
        <p class="control">
          <button class="button is-info" :disabled="!newComplaintContent">Add</button>
        </p>
      </div>
    </form>
    <!-- card -->
    <div class="card mb-5" v-for="complaint in complaints" :key="complaint.id">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">{{ complaint.content }}</div>
            <div class="column is-5 has-text-right">
              <!-- star button -->
              <button class="button is-success is-small" @click="countUpStar(complaint)">
                &starf;&nbsp;{{ complaint.star }}
              </button>
              <!-- delete button -->
              <button class="button is-danger ml-2 is-small" @click="deleteComplaint(complaint.id)">
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* 
  imports
*/

import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

/* 
  complaints
*/

const complaints = ref([
  // {
  //   id: 'id1',
  //   content: 'shave my butt',
  //   likes: 0,
  //   dateCreated: '20230418135300'
  // },
  // {
  //   id: 'id2',
  //   content: 'wash my butt',
  //   likes: 0,
  //   dateCreated: '20230417073555'
  // }
])

/*
  get complaints
*/

onMounted(() => {
  /* 
    Get data
  */

  // const querySnapshot = await getDocs(collection(db, 'complaints'))
  // let fbComplaints = []
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, ' => ', doc.data())
  //   const complaint = {
  //     id: doc.id,
  //     userid: doc.data().userid,
  //     content: doc.data().content,
  //     likes: doc.data().likes,
  //     dateCreated: doc.data().dateCreated
  //   }
  //   fbComplaints.push(complaint)
  // })
  // complaints.value = fbComplaints

  /* 
    Get realtime updates with Cloud Firestore 
  */

  onSnapshot(collection(db, 'complaints'), (querySnapshot) => {
    const fbComplaints = []
    querySnapshot.forEach((doc) => {
      const complaint = {
        id: doc.id,
        userid: doc.data().userid,
        content: doc.data().content,
        star: doc.data().star,
        dateCreated: doc.data().dateCreated
      }
      fbComplaints.push(complaint)
    })
    complaints.value = fbComplaints
  })
})

/*
  add complaint
*/

const newComplaintContent = ref('')

const addComplaint = () => {
  const newComplaint = {
    id: uuidv4(),
    content: newComplaintContent.value,
    star: 0,
    dateCreated: getCurrentDateAndTime()
  }
  complaints.value.unshift(newComplaint)
  newComplaintContent.value = ''
  console.log(newComplaint)
}

/*
  delete complaint
*/

const deleteComplaint = (id) => {
  complaints.value = complaints.value.filter((complaint) => complaint.id !== id)
}

/* 
  get current date and time >> yyyymmddhhmmss format
*/

const getCurrentDateAndTime = () => {
  let date_time = new Date()

  // get current date
  // adjust 0 before single digit date
  let date = ('0' + date_time.getDate()).slice(-2)

  // get current month
  let month = ('0' + (date_time.getMonth() + 1)).slice(-2)

  // get current year
  let year = date_time.getFullYear()

  // get current hours
  let hours = date_time.getHours()

  // get current minutes
  let minutes = date_time.getMinutes()

  // get current seconds
  let seconds = date_time.getSeconds()

  const yyyymmddhhmmss = year + month + date + hours + minutes + seconds
  return yyyymmddhhmmss
}

/*
  count up star
*/
const countUpStar = async (complaint) => {
  const fbComplaints = doc(db, 'complaints', complaint.id)
  await updateDoc(fbComplaints, {
    star: (complaint.star += 1)
  })
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
