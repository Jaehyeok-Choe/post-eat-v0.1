ComplaintBoxView.vue

<template>
  <div class="complaint-box">
    <!-- page title -->
    <div class="title has-text-centered text-h4 font-weight-bold">Complaint Box</div>
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
          </div>
          <!-- Card Footer Stard -->
          <!-- user status = user -->
          <footer class="card-footer" v-if="userStatus == 'u'">
            <a href="#" class="card-footer-item" @click="countUpStar(complaint)"
              ><v-icon>mdi-star-face</v-icon>&nbsp;{{ complaint.star }}</a
            >
          </footer>
          <!-- user status = member mine-->
          <footer class="card-footer" v-else-if="userStatus == 'mmy'">
            <a
              href="#"
              class="card-footer-item"
              @click.prevent="editComplaint(complaint.content, complaint.id)"
              ><v-icon>mdi-pencil</v-icon></a
            >
            <a href="#" class="card-footer-item" @click.prevent="countUpStar(complaint)"
              ><v-icon>mdi-star-face</v-icon>&nbsp;{{ complaint.star }}</a
            >
            <a href="#" class="card-footer-item" @click.prevent="addComment(complaint)"
              ><v-icon>mdi-message-reply</v-icon></a
            >
            <a href="#" class="card-footer-item" @click.prevent="deleteComplaint(complaint.id)"
              ><v-icon>mdi-delete</v-icon></a
            >
          </footer>
          <!-- user status = member not mine-->
          <footer class="card-footer" v-else-if="userStatus == 'mmn'">
            <a href="#" class="card-footer-item" @click="countUpStar(complaint)"
              ><v-icon>mdi-star-face</v-icon>&nbsp;{{ complaint.star }}</a
            >
            <a href="#" class="card-footer-item"><v-icon>mdi-message-reply</v-icon></a>
          </footer>
          <!-- user status = admin -->
          <footer class="card-footer" v-else>
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Save</a>
            <a href="#" class="card-footer-item">test</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
          <!-- Card Footer End -->
        </div>
      </div>
    </div>
    <div v-if="commentModal">
      <CommentModal
        :complaintId="complaintId"
        :complaintContent="complaintContent"
        @changeCommentModalStatus="changeCommentModalStatus()"
      />
    </div>
  </div>
</template>

<script setup>
/* 
  imports
*/

import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore'
import { db } from '@/firebase'
import Swal from 'sweetalert2'
import CommentModal from '@/components/complaint-box/CommentModal.vue'
/*
  userStatus for footer
*/
// userStatus: u  일반사용자
// userStatus: mmy 멤버이면서 본인 데이터일때
// userStatus: mmn 멤버이면서 본인 데이터가 아닐때
// userStatus: a  관리자
const userStatus = ref('')
userStatus.value = 'mmy'

/*
  show & hide by changing commentModal status  
 */

const commentModal = ref(false)
const changeCommentModalStatus = () => {
  commentModal.value = false
}

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
const complaintsCollectionQuery = query(
  complaintsCollectionRef,
  where('dateYYYYMMDD', '==', yyyymmdd), // show today's complaints only
  orderBy('dateCreated', 'desc'),
  limit(100)
)

/* 
  complaints 
*/

const complaints = ref([])

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

  onSnapshot(complaintsCollectionQuery, (querySnapshot) => {
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
      dateCreated: Date.now(),
      userid: uuidv4(),
      dateYYYYMMDD: yyyymmdd
    })
  }
  newComplaintContent.value = ''
}

/*
  add comment(댓글기능)
*/
const complaintId = ref('')
const complaintContent = ref('')
const addComment = (complaint) => {
  commentModal.value = !commentModal.value
  complaintId.value = complaint.id
  complaintContent.value = complaint.content
}

/*
  delete complaint
*/

const deleteComplaint = (id) => {
  Swal.fire({
    title: '삭제하시겠습니까?',
    showDenyButton: true,

    confirmButtonText: 'Yes',
    denyButtonText: `No`
  }).then((result) => {
    if (result.isConfirmed) {
      deleteDoc(doc(complaintsCollectionRef, id))
      Swal.fire('삭제되었습니다', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('삭제 취소되었습니다', '', 'info')
    }
  })
  // complaints.value = complaints.value.filter((complaint) => complaint.id !== id)
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

/*
  edit complaint
*/

const editComplaint = async (val, complaintId) => {
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputLabel: '다시쓰기',
    inputPlaceholder: val,
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  })

  // text 길이 유효성검사
  if (text.length > 201) {
    Swal.fire({ text: '200자 이내로 작성해 주시기 바랍니다' })
    return false
  } else if (text.length < 1) {
    Swal.fire({ text: '수정할 내용이 없습니다' })
    return false
  }

  if (text) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons
      .fire({
        title: text,
        text: '위 내용으로 수정하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          // 수정요청 날라감
          const fbComplaints = doc(db, 'complaints', complaintId)
          updateDoc(fbComplaints, {
            content: text
          })

          swalWithBootstrapButtons.fire('Done!', '', 'success')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Cancelled', '', 'error')
        }
      })
  }
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
