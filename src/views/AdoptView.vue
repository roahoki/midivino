<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import FormAdopt from '@/components/FormAdopt.vue'

const route = useRoute()
const loading = ref(true)
const pet = ref(null)

onMounted(() => {
  const petQuery = route.query.pet as string
  if (petQuery) {
    pet.value = JSON.parse(petQuery)
    loading.value = false
  } else {
    pet.value = null
    loading.value = false
}
}
)
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center my-8">
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>
  <div v-else-if="pet">
    <FormAdopt :pet="pet" />
  </div>
  <div v-else>
    <p class="text-red-500 font-bold">No se encontró ninguna mascota para adoptar.</p>
  </div>
</template>
