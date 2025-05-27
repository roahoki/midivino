<template>
  <div class="card w-full max-w-2xl mx-auto bg-base-100 shadow-md mt-6">
    <div class="card-body">
      <h2 class="card-title">Formulario de adopción para {{ pet.name }}</h2>

      <!-- SPINNER -->
      <div v-if="loading" class="flex justify-center items-center my-6">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- ALERTA ÉXITO -->
      <div v-if="status === 'success'" role="alert" class="alert alert-success mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Solicitud enviada correctamente 🐾</span>
      </div>
      <div v-if="status === 'success'" class="flex justify-end mt-4">
        <button @click="router.push('/pets')" class="btn btn-outline btn-primary">Finalizar</button>
      </div>

      <!-- ALERTA ERROR -->
      <div v-if="status === 'error'" role="alert" class="alert alert-error mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Error al enviar el formulario</span>
      </div>
      <div v-if="status === 'error'" class="flex justify-end mt-4">
        <button @click="resetForm" class="btn btn-outline btn-warning">Intentar nuevamente</button>
      </div>

      <!-- FORMULARIO -->
      <form v-if="!loading && status === 'idle'" @submit.prevent="submitForm" class="mt-4">
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box p-6">
          <legend class="fieldset-legend font-semibold text-lg">Información personal</legend>

          <label class="label mt-2" for="fullName">Nombre completo *</label>
          <input id="fullName" v-model="form.fullName" type="text" required placeholder="Ingresa tu nombre completo" class="input input-bordered w-full" />

          <label class="label mt-4" for="email">Correo electrónico *</label>
          <input id="email" v-model="form.email" type="email" required placeholder="Ingresa tu correo electrónico" class="input input-bordered w-full" />

          <label class="label mt-4" for="region">Región *</label>
          <select id="region" v-model="form.region" required class="select select-bordered w-full">
            <option value="" disabled>Seleccione una región</option>
            <option v-for="region in regionesChile" :key="region" :value="region">{{ region }}</option>
          </select>

          <label class="label mt-4" for="ciudad">Ciudad *</label>
          <input id="ciudad" v-model="form.ciudad" type="text" required placeholder="Ingresa tu ciudad" class="input input-bordered w-full" />

          <label class="label mt-4" for="ciudad">Comuna *</label>
          <input id="comuna" v-model="form.comuna" type="text" required placeholder="Ingresa tu comuna" class="input input-bordered w-full" />

          <label class="label mt-4" for="celular">Celular *</label>
          <input id="celular" v-model="form.celular" type="tel" required placeholder="Ingresa tu celular (9 dígitos)" class="input input-bordered w-full" />
        </fieldset>

        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box p-6 mt-6">
          <legend class="fieldset-legend font-semibold text-lg">Información del candidato</legend>

          <Question question="1. Ocupación" name="ocupacion" :options="['Empleado', 'No empleado', 'Estudiante']" v-model="form.ocupacion" />
          <Question question="2. ¿En qué tipo de vivienda habitas?" name="vivienda" :options="['Casa', 'Departamento']" v-model="form.vivienda" />
          <Question question="3. ¿Hay niños pequeños en tu vivienda?" name="ninos" :options="['Sí', 'No']" v-model="form.ninos" />
          <Question question="4. ¿Cuánto tiempo le dedicarías a tu mascota al día?" name="tiempoMascota" :options="['Menos de 1 hr', 'De 1 a 3 hrs', 'Más de 3 hrs']" v-model="form.tiempoMascota" />
          <Question question="5. ¿Todas las personas de tu hogar están de acuerdo con adoptar?" name="acuerdoHogar" :options="['Sí', 'No']" v-model="form.acuerdoHogar" />
          <Question question="6. ¿Puedes cubrir sus gastos? (veterinario, alimentación, etc.)" name="cubrirGastos" :options="['Sí', 'No']" v-model="form.cubrirGastos" />
          <Question question="7. ¿Estás dispuestx a dedicarle de 10 a 15 años a la mascota?" name="dedicacionAnios" :options="['Sí', 'No']" v-model="form.dedicacionAnios" />
          <Question question="8. ¿Te gustaría hacer una donación al refugio?" name="donacion" :options="['Sí', 'No']" v-model="form.donacion" />
        </fieldset>

        <div class="card-actions justify-end mt-6">
          <button type="submit" class="btn btn-primary">Enviar formulario</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Question from './Question.vue'
import { usePetStore } from '@/stores/petStore';

const router = useRouter()
const petStore = usePetStore();

const { pet } = defineProps<{
  pet: {
    id: number
    name: string
    status: string
  }
}>()

const loading = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')

const regionesChile = [
  'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
  'Valparaíso', 'Región Metropolitana de Santiago', 'O’Higgins', 'Maule',
  'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos',
  'Aysén', 'Magallanes y la Antártica Chilena'
]

const form = ref({
  fullName: '', email: '', region: '', ciudad: '', comuna: '', celular: '',
  ocupacion: '', vivienda: '', ninos: '', tiempoMascota: '',
  acuerdoHogar: '', cubrirGastos: '', dedicacionAnios: '', donacion: ''
})

const submitForm = async () => {
  loading.value = true
  status.value = 'idle'

  try {
    const order = {
      id: Date.now(),
      petId: pet.id,
      quantity: 1,
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: true
    }

    const response = await fetch('https://petstore.swagger.io/v2/store/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })

    if (response.ok) {
      petStore.removePet(pet.id); // Eliminar la mascota adoptada de la store
      status.value = 'success';
    } else {
      status.value = 'error';
    }
  } catch (e) {
    console.error('Error al enviar formulario:', e)
    status.value = 'error'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  status.value = 'idle'
  loading.value = false
}
</script>
