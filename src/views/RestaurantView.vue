<template>
  <div v-for="restaurant in restaurants" :key="restaurant">
    <RestaurantCard
      :restaurants="{
        id: restaurant.id,
        name: restaurant.name,
        distance: restaurant.distance,
        more: restaurant.more,
        category: restaurant.category,
        contactNumber: restaurant.contactNumber,
        closeTime: restaurant.closeTime
      }"
    />
  </div>
</template>

<script setup>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { onMounted, ref } from 'vue'
import RestaurantCard from '../components/restaurant/RestaurantCard.vue'

const restaurants = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'restaurant'))
  let fbRestaurant = []
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
    const restaurant = {
      id: doc.id,
      name: doc.data().name,
      distance: doc.data().distance,
      category: doc.data().category,
      more: doc.data().more,
      contactNumber: doc.data().contactNumber,
      closeTime: doc.data().closeTime
    }
    fbRestaurant.push(restaurant)
  })
  restaurants.value = fbRestaurant
})
</script>
