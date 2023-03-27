<template>
  <v-app>
    <AppbarView />
    <v-main>
      <RouterView />
    </v-main>
    <BottomView />
  </v-app>
</template>

<script>
import AppbarView from './views/AppbarView.vue'
import BottomView from './views/BottomView.vue'

export default {
  data: () => ({ value: 1 }),
  components: { BottomView, AppbarView }
}
</script>
<style></style>
