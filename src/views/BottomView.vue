<template>
  <div class="bottomNav">
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" color="teal" grow>
        <v-btn :to="{ name: 'mealPlanView' }">
          <v-icon>mdi-rice</v-icon>
          식단표
        </v-btn>
        <v-btn :to="{ name: 'complaintbox' }">
          <v-icon>mdi-bullhorn</v-icon>
          대나무숲
        </v-btn>
        <v-btn :to="{ name: 'cafe' }">
          <v-icon>mdi-coffee</v-icon>
          일층카페
        </v-btn>
        <v-btn :to="{ name: 'admin' }" v-if="adminYn">
          <v-icon>mdi-cog</v-icon>
          관리자만
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// admin test
const adminYn = ref(true)
</script>

<style scoped>
@font-face {
  font-family: 'OAGothic-ExtraBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/OAGothic-ExtraBold.woff2')
    format('woff2');
  font-weight: 800;
  font-style: normal;
}

.bottomNav {
  font-family: 'OAGothic-ExtraBold';
}
</style>
