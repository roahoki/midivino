<template>
  <div class="card w-full max-w-2xl mx-auto bg-base-100 shadow-md mt-6">
    <div class="card-body">
      <h2 class="card-title">Dar en adopción</h2>

      <!-- SPINNER -->
      <div v-if="loading" class="flex justify-center items-center my-6">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- ALERTAS -->
      <div v-if="status === 'success'" role="alert" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Publicación de adopción exitosa</span>
      </div>

      <div v-if="status === 'error'" role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Error al crear la mascota</span>
      </div>

      <!-- BOTÓN REINICIAR -->
      <div v-if="status !== 'idle'" class="mt-4 flex space-x-2 justify-end">
        <button class="btn btn-outline btn-primary" @click="resetForm">Publicar nueva mascota</button>
        <button @click="router.push('/pets')" class="btn btn-outline btn-primary">Finalizar</button>
      </div>

      <!-- FORMULARIO -->
      <form v-if="!loading && status === 'idle'" @submit.prevent="submitPet" class="mt-4">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box p-6">

          <label class="label mt-2">Nombre de la mascota *</label>
          <input v-model="pet.name" type="text" class="input input-bordered w-full" required />

          <label class="label mt-4">URL de la foto *</label>
          <input v-model="photoUrl" type="url" class="input input-bordered w-full" required />

          <label class="label mt-4">Categoría</label>
          <select v-model="pet.category.name" class="select select-bordered w-full">
            <option disabled value="">Selecciona categoría</option>
            <option>Perro</option>
            <option>Gato</option>
            <option>Ave</option>
            <option>Roedor</option>
            <option>Reptil</option>
            <option>Otro</option>
          </select>

          <label class="label mt-4">Etiqueta</label>
          <select v-model="tag" class="select select-bordered w-full">
            <option disabled value="">Selecciona etiqueta</option>
            <option>Cachorro</option>
            <option>Adulto</option>
            <option>Senior</option>
          </select>

          <label class="label mt-4">Estado</label>
          <input class="input input-bordered bg-gray-100 cursor-not-allowed w-full" value="available" disabled />
        </fieldset>

        <div class="card-actions justify-end mt-6">
          <button class="btn btn-primary" type="submit">Publicar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePetStore } from '@/stores/petStore';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const petStore = usePetStore()


const pet = ref({
  id: Date.now(),
  name: '',
  category: { id: 0, name: '' },
  photoUrls: [] as string[],
  tags: [] as { id: number; name: string }[],
  status: 'available',
})

const photoUrl = ref('')
const tag = ref('')
const status = ref<'idle' | 'success' | 'error'>('idle')
const loading = ref(false)

const submitPet = async () => {
  loading.value = true
  status.value = 'idle'
  pet.value.photoUrls = [photoUrl.value.trim()]
  pet.value.tags = tag.value ? [{ id: Date.now(), name: tag.value.trim() }] : []

  try {
    const response = await fetch('https://petstore.swagger.io/v2/pet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet.value),
    })

    if (response.ok) {
      status.value = 'success'
      // Eliminamos cualquier lógica que implique un GET adicional
      // El método `addPet` ya se encarga de agregar la mascota a la store
      petStore.addPet(pet.value)
    } else {
      status.value = 'error'
    }
  } catch (error) {
    console.error(error)
    status.value = 'error'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  pet.value = {
    id: Date.now(),
    name: '',
    category: { id: 0, name: '' },
    photoUrls: [],
    tags: [],
    status: 'available',
  }
  photoUrl.value = ''
  tag.value = ''
  status.value = 'idle'
  loading.value = false
}
</script>
