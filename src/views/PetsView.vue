<template>
  <div v-if="loading" class="flex justify-center items-center my-8">
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>


  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <PetCard v-for="pet in pets" :pet="pet" @adoptar="adoptPet" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import PetCard from '@/components/PetCard.vue'
import { usePetStore } from '@/stores/petStore';

interface Pet {
  id: number
  name: string
  status: string
}

const loading = ref(true)
const { isAuthenticated, loginWithRedirect, user } = useAuth0()
const router = useRouter()
const petStore = usePetStore();
const pets = computed(() => petStore.pets);

const adoptPet = (pet: Pet) => {
  console.log('Adoptando mascota:', pet.id)
  router.push({ name: 'adopt', query: { pet: JSON.stringify(pet) } })
}

onMounted(async () => {
  try {
    // Verifica si el usuario ya está autenticado
    if (user.value) {
      console.log('Usuario autenticado:', user.value);
      if (!petStore.pets.length) {
        await petStore.initializePets();
        petStore.filterUniquePetsByName();
      }
    } else {
      console.log('Usuario no autenticado, redirigiendo al login...');
      loginWithRedirect();
    }
  } catch (e) {
    console.error('Error al verificar la sesión:', e);
    loginWithRedirect();
  } finally {
    loading.value = false;
  }
})
</script>
