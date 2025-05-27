<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import img1 from '@/assets/gatitos.jpg'
import img2 from '@/assets/perros.jpg'
import img3 from '@/assets/perros-2.jpg'
import img4 from '@/assets/mano-perro.jpg'

const slides = [
  { image: img1, caption: 'Adoptar es amar sin condiciones 🐶' },
  { image: img2, caption: 'Una casa no está completa sin una mascota 🐱' },
  { image: img3, caption: 'Cambia una vida... y deja que cambien la tuya ❤️' },
  { image: img4, caption: 'No compres amor, adóptalo 🐾' },
]

const activeIndex = ref(0)
let intervalId: number | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length
  }, 15000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <section class="w-full max-w-6xl mx-auto px-4 mt-6">
    <div class="relative aspect-[5/4] sm:aspect-[4/3] md:aspect-[3/1] rounded-box overflow-hidden shadow-md">
      <transition-group name="fade" mode="out-in">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          v-show="index === activeIndex"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="slide.image"
            class="w-full h-full object-cover"
            alt="Imagen inspiracional"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center px-4 py-2 text-sm sm:text-base md:text-lg font-semibold"
          >
            {{ slide.caption }}
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
