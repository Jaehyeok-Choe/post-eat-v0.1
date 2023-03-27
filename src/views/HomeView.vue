<template>
  <div class="home">
    <h1>This is 맛집 view page!</h1>
    <!-- <div class="count">{{ counter.count }}</div>
    <div class="buttons">
      <v-btn
        density="compact"
        icon="mdi-minus"
        size="x-large"
        @click="counter.countDecrease"
      ></v-btn>
      |
      <v-btn density="compact" icon="mdi-plus" size="x-large" @click="counter.countIncrease"></v-btn
      ><br />
      <hr />
      <input type="number" v-model="counter.count" />
    </div> -->
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
