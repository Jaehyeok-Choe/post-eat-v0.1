<template>
  <div class="bottomNav">
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" color="#cc2715" grow>
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
        <v-btn :to="{ name: 'admin' }" v-if="userStatus === 'admin'">
          <v-icon>mdi-cog</v-icon>
          관리자만
        </v-btn>
        <v-btn :to="{ name: 'member' }" v-else-if="userStatus === 'member'">
          <v-icon>mdi-earth</v-icon>
          마이페이지
        </v-btn>
        <v-btn :to="{ name: 'login' }" v-else>
          <v-icon>mdi-login</v-icon>
          로그인
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup>
/*
  imports
*/
import { useUserStatusStore } from '../stores/userStatus'

/*
  pinia
*/
const storeUserStatus = useUserStatusStore()

const userStatus = storeUserStatus.status
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
