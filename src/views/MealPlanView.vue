<template>
  <div class="mealPlan">
    <v-card class="mt-5" flat>
      <v-title
        ><center>오늘은 {{ getYYYYMMDD() }} {{ getDayOfWeekInKorea() }}" 입니다</center></v-title
      >
      <v-img
        :src="url"
        class="align-end mt-5"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="500px"
        cover
      >
        <v-card-title class="text-white"></v-card-title>
      </v-img>

      <v-card-actions>
        <v-spacer></v-spacer>

        ENJOY YOUR MEAL :)
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { storage } from '../firebase'
import { ref, getDownloadURL } from 'firebase/storage'

export default {
  data: () => {
    return {
      url: '',
      path: 'mealPlan/meal-plan.jpg',
      date: new Date(),
      year: '',
      month: '',
      day: '',
      dayInKorean: '',
      yyyymmdd: 0
    }
  },
  mounted() {
    getDownloadURL(ref(storage, this.path)).then((download_url) => (this.url = download_url))
  },
  methods: {
    getYYYYMMDD() {
      this.year = this.date.getFullYear()
      this.month = ('0' + (this.date.getMonth() + 1)).slice(-2)
      this.day = ('0' + this.date.getDate()).slice(-2)
      this.yyyymmdd = '"' + this.year + '.' + this.month + '.' + this.day
      return this.yyyymmdd
    },
    getDayOfWeekInKorea() {
      let day = new Date()
      const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      this.dayInKorean = weekday[day.getDay()]
      return this.dayInKorean
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

.mealPlan {
  font-family: 'OAGothic-ExtraBold';
}
</style>
