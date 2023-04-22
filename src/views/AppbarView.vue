<template>
  <div>
    <v-app-bar color="#cc2715">
      <div class="appbar-name ml-3">
        <v-btn :to="{ name: 'mealPlanView' }" color="white">
          <v-app-bar-title><v-icon>mdi-post</v-icon> epostEAT</v-app-bar-title>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'OAGothic-ExtraBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/OAGothic-ExtraBold.woff2')
    format('woff2');
  font-weight: 800;
  font-style: normal;
}
.appbar-name {
  font-family: 'OAGothic-ExtraBold';
}
</style>
