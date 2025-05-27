<template>
  <div class="card bg-base-100 shadow-md border border-base-300">
    <div class="card-body p-4">
      <h2 class="card-title text-lg font-semibold text-base-content">
        {{ pet.name }}
      </h2>
      <p class="text-sm text-base-content/80">Estado: {{ pet.status }}</p>
      <div class="card-actions justify-end mt-2">
        <button
          class="btn btn-primary btn-sm"
          @click="$emit('adoptar', pet)"
        >
          Adoptar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pet: {
    id: number
    name: string
    status: string
  }
}>()

defineEmits(['adoptar'])
</script>
