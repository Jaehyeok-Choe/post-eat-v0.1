<template>
  <div class="cafe-box text-center">
    <v-btn class="ma-2" color="primary" @click="expand2 = !expand2">What's going on here? </v-btn>
    <v-expand-x-transition>
      <v-card v-show="expand2" height="30" width="120" class="mx-auto bg-grey"
        >&nbsp;&nbsp;IT'S COMING!</v-card
      >
    </v-expand-x-transition>
  </div>
</template>
<script>
export default {
  data: () => ({
    expand: false,
    expand2: false
  })
}
</script>
<style>
.cafe-box {
  max-width: 400px;
  padding: 70px;
  margin: 0 auto;
}
</style>
