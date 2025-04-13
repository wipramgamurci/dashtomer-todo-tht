<template>
  <form @submit.prevent="handleSubmit" class="w-full mb-4 md:max-w-[600px] md:mx-auto">
    <div class="flex gap-2 w-full">
      <InputText
        v-model="newTaskTitle"
        placeholder="Add a new task..."
        class="flex-1 min-w-0 text-base p-3"
        :class="{ 'p-invalid': showError }"
        @keydown.enter.prevent="handleSubmit"
      />
      <Button
        type="submit"
        icon="pi pi-plus"
        class="min-w-[48px] min-h-[48px] p-3"
        :disabled="!isValid"
        aria-label="Add task"
      />
    </div>
    <small v-if="showError" class="text-red-500 block mt-2">Task title cannot be empty</small>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const taskStore = useTaskStore()
const newTaskTitle = ref('')
const showError = ref(false)

const isValid = computed(() => {
  return newTaskTitle.value.trim().length > 0
})

const handleSubmit = () => {
  if (!isValid.value) {
    showError.value = true
    return
  }

  taskStore.addTask(newTaskTitle.value.trim())
  newTaskTitle.value = ''
  showError.value = false
}
</script>

<style scoped>

</style> 