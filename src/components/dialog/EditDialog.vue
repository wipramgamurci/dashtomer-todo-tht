<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '90vw', maxWidth: '400px' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    :draggable="false"
    :closable="false"
    class="p-dialog-sm"
    aria-label="Edit task dialog"
  >
    <template #header>
      <h2 class="text-lg font-semibold m-0">Edit Task</h2>
    </template>

    <div class="flex flex-col gap-4">
      <InputText
        v-model="editedTitle"
        class="w-full"
        placeholder="Enter task title"
        @keyup.enter="handleSave"
        aria-label="Task title"
      />
      <small v-if="error" class="text-red-500">{{ error }}</small>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          label="Cancel"
          class="p-button-text"
          @click="handleCancel"
          aria-label="Cancel editing"
        />
        <Button
          label="Save"
          class="p-button-primary"
          @click="handleSave"
          :disabled="!editedTitle.trim()"
          aria-label="Save changes"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps<{
  taskId: string
  currentTitle: string
}>()

const emit = defineEmits<{
  (e: 'save', taskId: string, newTitle: string): void
}>()

const visible = ref(false)
const editedTitle = ref('')
const error = ref('')

watch(() => props.currentTitle, (newTitle) => {
  editedTitle.value = newTitle
})

const open = () => {
  editedTitle.value = props.currentTitle
  error.value = ''
  visible.value = true
}

const handleSave = () => {
  if (!editedTitle.value.trim()) {
    error.value = 'Task title cannot be empty'
    return
  }

  emit('save', props.taskId, editedTitle.value)
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}

defineExpose({
  open
})
</script>

<style scoped>

</style> 