<template>
  <div class="about">
    <h1>This is 식단 view page!</h1>
  </div>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>
<style>
.about {
  text-align: center;
}
</style>
