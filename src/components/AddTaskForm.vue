<template>
  <form @submit.prevent="handleSubmit" class="add-task-form">
    <div class="input-group">
      <InputText
        v-model="newTaskTitle"
        placeholder="Add a new task..."
        class="task-input"
        :class="{ 'p-invalid': showError }"
        @keydown.enter.prevent="handleSubmit"
      />
      <Button
        type="submit"
        icon="pi pi-plus"
        class="add-button"
        :disabled="!isValid"
        aria-label="Add task"
      />
    </div>
    <small v-if="showError" class="error-message">Task title cannot be empty</small>
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
.add-task-form {
  width: 100%;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.task-input {
  flex: 1;
  min-width: 0; /* Prevents input from overflowing */
  font-size: 1rem;
  padding: 0.75rem;
}

.add-button {
  min-width: 48px;
  min-height: 48px;
  padding: 0.75rem;
}

.error-message {
  color: var(--red-500);
  display: block;
  margin-top: 0.5rem;
}

/* Desktop styles */
@media (min-width: 768px) {
  .add-task-form {
    max-width: 600px;
    margin: 0 auto 1rem;
  }

  .add-button:hover {
    background-color: var(--primary-600);
  }
}
</style> 