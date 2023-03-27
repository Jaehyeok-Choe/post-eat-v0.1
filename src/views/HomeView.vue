<template>
  <div class="home">
    <div class="count">{{ counter.count }}</div>
    <div class="buttons">
      <v-btn density="compact" icon="mdi-minus" size="x-large"></v-btn> |
      <v-btn density="compact" icon="mdi-plus" size="x-large"></v-btn>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>
<style>
.count {
  font-size: 70px;
  text-align: center;
}
.buttons {
  font-size: 30px;
  text-align: center;
}
</style>
