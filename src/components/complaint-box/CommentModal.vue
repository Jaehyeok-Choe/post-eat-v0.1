<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">COMMENT</span>
        </v-card-title>
        <v-card-text> "{{ complaintContent }}" </v-card-text>
        <v-card-text>
          <!-- input -->
          <div class="field is-grouped mb-5">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="댓글쓰기" v-model="newCommentContent" />
            </p>
            <!-- add button -->
            <p class="control">
              <button
                class="button is-info"
                @click.prevent="addComment(), countUpComentView(props.complaintForComment)"
                :disabled="!newCommentContent"
              >
                Add
              </button>
            </p>
          </div>
          <!-- comment card -->
          <div v-for="comment in comments" :key="comment.id" class="card mb-5">
            <div class="card-content">
              <div class="content">
                <div class="columns is-mobile is-vcentered">
                  <div class="column">{{ comment.content }}</div>
                  <div class="column is-5 has-text-right">
                    <button
                      class="button is-danger"
                      @click.prevent="
                        deleteComment(comment.id), countDownComentView(props.complaintForComment)
                      "
                    >
                      &cross;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="$emit('changeCommentModalStatus'), (dialog = false)"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore'
import { db } from '@/firebase'
import { v4 as uuidv4 } from 'uuid'
// import Swal from 'sweetalert2'

/*
  props
*/

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  complaintId: {
    type: String,
    default: 'n/a'
  },
  complaintContent: {
    type: String,
    default: 'n/a'
  },
  complaintForComment: {
    type: Object
  }
})

/*
  emit
 */

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['changeCommentModalStatus'])

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

const commentsCollectionRef = collection(db, 'comments')
const commentsCollectionQuery = query(
  commentsCollectionRef,
  where('complaintId', '==', props.complaintId),
  orderBy('dateCreated', 'desc'),
  limit(100)
)

/* 
  comments 
*/

const comments = ref([])

/* 
    Get data & realtime updates with Cloud Firestore 
*/

onMounted(() => {
  onSnapshot(commentsCollectionQuery, (querySnapshot) => {
    const fbComments = []
    querySnapshot.forEach((doc) => {
      const comment = {
        id: doc.id,
        complaintId: doc.data().complaintId,
        userid: doc.data().userid,
        content: doc.data().content,
        numberOfReply: doc.data().numberOfReply,
        dateCreated: doc.data().dateCreated
      }
      fbComments.push(comment)
    })
    comments.value = fbComments
  })
})

/*
  delete comment
*/

const deleteComment = (id) => {
  deleteDoc(doc(commentsCollectionRef, id))
}

/*
  flag
*/

const dialog = ref(true)

/*
  add complaint
*/

const newCommentContent = ref('')

const addComment = () => {
  addDoc(commentsCollectionRef, {
    content: newCommentContent.value,
    complaintId: props.complaintId,
    dateCreated: Date.now(),
    userid: uuidv4(),
    dateYYYYMMDD: yyyymmdd
  })
  newCommentContent.value = ''
}

/* 
    count up commentView
*/

const countUpComentView = async (complaintForComment) => {
  const fbComplaints = doc(db, 'complaints', complaintForComment.id)
  await updateDoc(fbComplaints, {
    commentView: (complaintForComment.commentView += 1)
  })
}

/* 
    count down commentView
*/

const countDownComentView = async (complaintForComment) => {
  const fbComplaints = doc(db, 'complaints', complaintForComment.id)
  await updateDoc(fbComplaints, {
    commentView: (complaintForComment.commentView -= 1)
  })
}
</script>
<style>
@import 'bulma/css/bulma.min.css';
</style>
