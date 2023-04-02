<template>
  <div class="bottomNav">
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation v-model="value" color="teal" grow>
        <v-btn :to="{ name: 'restaurant' }">
          <v-icon>mdi-map</v-icon>

          맛집
        </v-btn>

        <v-btn :to="{ name: 'about' }">
          <v-icon>mdi-rice</v-icon>

          식단
        </v-btn>

        <v-btn :to="{ name: 'cafe' }">
          <v-icon>mdi-coffee</v-icon>

          카페
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup></script>

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
