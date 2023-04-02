<template>
  <div class="restaurantCard">
    <v-card class="mx-auto ma-10" max-width="344">
      <v-carousel show-arrows="hover" height="250">
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>

      <v-card-title> {{ restaurants.name }} </v-card-title>

      <v-card-subtitle>
        <div v-if="restaurants.category === '한식'">
          <v-chip class="ma-2" color="green" text-color="white">
            {{ restaurants.category }}
          </v-chip>
          / {{ restaurants.distance }}km
        </div>
        <div v-else-if="restaurants.category === '일식'">
          <v-chip class="ma-2" color="blue" text-color="white">
            {{ restaurants.category }}
          </v-chip>
          / {{ restaurants.distance }}km
        </div>
        <div v-else-if="restaurants.category === '중식'">
          <v-chip class="ma-2" color="yellow" text-color="white">
            {{ restaurants.category }}
          </v-chip>
          / {{ restaurants.distance }}km
        </div>
        <div v-else-if="restaurants.category === '카페'">
          <v-chip class="ma-2" color="brown" text-color="white">
            {{ restaurants.category }}
          </v-chip>
          / {{ restaurants.distance }}km
        </div>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text"> More </v-btn>

        <v-spacer></v-spacer>

        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text> {{ restaurants.more }}</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const show = ref(false)
const testDate = ref(Math.round(Date.now() / 1000))
console.log(testDate)

defineProps({
  restaurants: {}
})
</script>
<style>
@font-face {
  font-family: 'OAGothic-ExtraBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/OAGothic-ExtraBold.woff2')
    format('woff2');
  font-weight: 800;
  font-style: normal;
}

.restaurantCard {
  font-family: 'OAGothic-ExtraBold';
}
</style>
