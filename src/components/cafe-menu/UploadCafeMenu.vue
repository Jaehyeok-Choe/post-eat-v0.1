<template>
  <v-card class="mx-auto mt-15" max-width="344" variant="outlined">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">WELCOME</div>
        <div class="text-h6 mb-1">Cafe Menu</div>
        <div class="text-caption">Upload menu</div>
      </div>
    </v-card-item>
    <v-card-item>
      <form @submit.prevent="submit">
        <v-text-field
          v-model="name.value.value"
          :counter="20"
          :error-messages="name.errorMessage.value"
          label="Name"
        ></v-text-field>

        <v-text-field
          type="number"
          v-model="price.value.value"
          :counter="5"
          :error-messages="price.errorMessage.value"
          label="Price"
        ></v-text-field>

        <v-select
          v-model="selectMenu.value.value"
          :items="menuItems"
          :error-messages="selectMenu.errorMessage.value"
          label="Select menu"
        ></v-select>

        <v-select
          v-model="selectSize.value.value"
          :items="sizeItems"
          :error-messages="selectSize.errorMessage.value"
          label="Select size"
        ></v-select>

        <v-card-actions class="justify-center">
          <v-btn class="me-4 mb-5" type="submit" color="success"> Add </v-btn>
          <v-btn @click="handleReset" class="mb-5" color="warning"> clear </v-btn>
        </v-card-actions>
      </form>
    </v-card-item>
  </v-card>
</template>
<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

export default {
  setup() {
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true

          return 'Name needs to be at least 2 characters.'
        },
        price(value) {
          if (value?.length > 2 && value?.length < 6) return true

          return 'Price number needs to be at least 3 digits.'
        },
        selectMenu(value) {
          if (value) return true

          return 'Select an item.'
        },
        selectSize(value) {
          if (value) return true

          return 'Select an item.'
        }
      }
    })
    const name = useField('name')
    const price = useField('price')
    const selectMenu = useField('selectMenu')
    const selectSize = useField('selectSize')

    const menuItems = ref(['COFFEE', 'JUICE', 'TEA', 'ELSE'])
    const sizeItems = ref(['S', 'R', 'L'])

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2))
    })

    return { name, price, selectMenu, selectSize, menuItems, sizeItems, submit, handleReset }
  }
}
</script>
