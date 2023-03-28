<template>
  <v-card class="mx-auto" max-width="500" flat>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-img
              :src="card.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
              @click="test(card.title)"
            >
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-text>Enjoy your meal :)</v-text>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6
      },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
    ]
  }),
  methods: {
    test(title) {
      alert(title)
    }
  }
}
</script>
<style scoped></style>
