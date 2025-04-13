<template>
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '90%', maxWidth: '400px' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    header="Delete Task"
  >
    <div class="flex flex-col gap-4">
      <p class="text-base">
        Are you sure you want to delete this task?
      </p>
      <div class="flex justify-end gap-2 mt-4">
        <Button
          label="Cancel"
          class="p-button-text"
          @click="visible = false"
        />
        <Button
          label="Delete"
          class="p-button-danger"
          @click="handleConfirm"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps<{
  taskId: string
}>()

const emit = defineEmits<{
  (e: 'confirm', taskId: string): void
}>()

const visible = ref(false)

const handleConfirm = () => {
  emit('confirm', props.taskId)
  visible.value = false
}

// Expose method to open dialog
defineExpose({
  open: () => visible.value = true
})
</script>

<style>

</style> 