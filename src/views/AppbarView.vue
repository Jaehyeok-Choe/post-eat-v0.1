<template>
  <div>
    <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>

      <template v-slot:prepend> </template>

      <v-app-bar-title><v-icon>mdi-post</v-icon> PostEAT</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
