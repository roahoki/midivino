<template>
  <div class="mb-4">
    <p class="font-semibold mb-1">{{ question }}</p>
    <div v-for="option in options" :key="option" class="inline-block mr-4">
      <label>
        <input
          type="radio"
          :name="name"
          :value="option"
          :checked="modelValue === option"
          @change="$emit('update:modelValue', option)"
          required
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  question: string
  name: string
  options: string[]
  modelValue: string
}>()

defineEmits(['update:modelValue'])
</script>
