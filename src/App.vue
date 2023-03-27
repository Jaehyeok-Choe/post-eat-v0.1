<template>
  <v-app>
    <v-main>
      <div class="app">
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'about' }">About</router-link>
      </div>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script></script>
<style>
.app {
  font-size: 50px;
  text-align: center;
}
</style>
