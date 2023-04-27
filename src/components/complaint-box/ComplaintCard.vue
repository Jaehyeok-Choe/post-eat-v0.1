<template lang="">
  <!-- complaint card -->
  <div class="card mb-5" v-for="complaint in complaints" :key="complaint.id">
    <div class="card-content">
      <div class="content">
        <div class="columns is-mobile is-vcentered">
          <div class="column">{{ complaint.content }}</div>
        </div>
        <!-- card footer start: edit / star / comment / delete -->
        <!-- user status = admin -->
        <footer class="card-footer" v-if="userStatus == 'admin'">
          <a
            href="#"
            class="card-footer-item"
            @click.prevent="editComplaint(complaint.content, complaint.id, complaint.commentView)"
            ><v-icon>mdi-pencil</v-icon></a
          >
          <a href="#" class="card-footer-item" @click.prevent="countUpStar(complaint)"
            ><v-icon>mdi-star-face</v-icon>&nbsp;{{ complaint.star }}</a
          >
          <a href="#" class="card-footer-item" @click.prevent="addComment(complaint)"
            ><v-icon>mdi-message-reply</v-icon>&nbsp;{{ complaint.commentView }}</a
          >
          <a href="#" class="card-footer-item" @click.prevent="deleteComplaint(complaint.id)"
            ><v-icon>mdi-delete</v-icon></a
          >
        </footer>
        <!-- user status = member -->
        <footer class="card-footer" v-else-if="userStatus == 'member'">
          <a
            href="#"
            class="card-footer-item"
            @click.prevent="editComplaint(complaint.content, complaint.id, complaint.commentView)"
            v-if="complaint.userid === userEmail"
            ><v-icon>mdi-pencil</v-icon>
          </a>
          <a href="#" class="card-footer-item" @click.prevent="countUpStar(complaint)"
            ><v-icon>mdi-star-face</v-icon>&nbsp;{{ complaint.star }}</a
          >
          <a href="#" class="card-footer-item" @click.prevent="addComment(complaint)"
            ><v-icon>mdi-message-reply</v-icon>&nbsp;{{ complaint.commentView }}</a
          >
          <a
            href="#"
            class="card-footer-item"
            @click.prevent="deleteComplaint(complaint.id)"
            v-if="complaint.userid === userEmail"
            ><v-icon>mdi-delete</v-icon></a
          >
        </footer>
        <!-- user status = visitor -->
        <footer class="card-footer" v-else-if="userStatus == 'visitor'"></footer>
        <!-- user status = ??? -->
        <footer class="card-footer" v-else></footer>
        <!-- card footer end -->
      </div>
    </div>
  </div>
  <div v-if="commentModal">
    <CommentModal
      :complaintId="complaintId"
      :complaintContent="complaintContent"
      :complaintForComment="complaintForComment"
      @changeCommentModalStatus="changeCommentModalStatus()"
    />
  </div>
</template>
<script setup>
/* 
  imports
*/

import { ref, onMounted } from 'vue'

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore'
import { db } from '@/firebase'
import Swal from 'sweetalert2'
import CommentModal from '@/components/complaint-box/CommentModal.vue'
import { useUserStatusStore } from '../../stores/userStatus'

/*
  pinia
*/

const storeUserStatus = useUserStatusStore()

const userEmail = ref('')
const userStatus = ref('')

userEmail.value = storeUserStatus.email
userStatus.value = storeUserStatus.status

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
  // get complaints collection
  onSnapshot(complaintsCollectionQuery, (querySnapshot) => {
    const fbComplaints = []
    querySnapshot.forEach((doc) => {
      const complaint = {
        id: doc.id,
        userid: doc.data().userid,
        content: doc.data().content,
        star: doc.data().star,
        commentView: doc.data().commentView,
        dateCreated: doc.data().dateCreated
      }
      fbComplaints.push(complaint)
    })
    complaints.value = fbComplaints
  })
})

/*
  show & hide by changing commentModal status  
 */

const commentModal = ref(false)
const changeCommentModalStatus = () => {
  commentModal.value = false
}

/*
  add comment(댓글기능 => CommentModal 컴포넌트에 넘길 값(props) 세팅)
*/
const complaintId = ref('')
const complaintContent = ref('')
const complaintForComment = ref() // CommentModal 컴포넌트에 객체로 값을 넘겨준다

const addComment = (complaint) => {
  commentModal.value = !commentModal.value
  complaintId.value = complaint.id
  complaintContent.value = complaint.content
  complaintForComment.value = complaint
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
    inputValue: val,
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
<style lang=""></style>
