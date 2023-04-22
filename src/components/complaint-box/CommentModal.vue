<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="400" persistent scrollable>
      <v-card>
        <v-card-title>
          <span class="text-h5">COMMENT</span>
        </v-card-title>
        <v-card-text> {{ complaintContent }} </v-card-text>
        <v-card-text>
          <form>
            <!-- input -->
            <div class="field is-grouped mb-5">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="댓글쓰기" />
              </p>
              <!-- add button -->
              <p class="control">
                <button class="button is-info">Add</button>
              </p>
            </div>
          </form></v-card-text
        >
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

import { ref } from 'vue'

/*
  flag
*/

const dialog = ref(true)

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
  }
})

/*
  emit
 */

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['changeCommentModalStatus'])
</script>
