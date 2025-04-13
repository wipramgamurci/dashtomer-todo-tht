<template>
  <div 
    class="flex items-center justify-between p-4 bg-white rounded-lg mb-2 transition-all duration-200"
    :class="{ 'opacity-60': task.completed }"
  >
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <div class="flex items-center justify-center min-w-[48px] min-h-[48px]">
        <Checkbox
          :modelValue="task.completed"
          :binary="true"
          @update:modelValue="handleToggle"
          class="w-6 h-6"
          aria-label="Toggle task completion"
        />
      </div>
      <span 
        class="text-base flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
        :class="{ 'line-through text-text-secondary': task.completed }"
      >
        {{ task.title }}
      </span>
    </div>
    <div class="flex gap-2">
      <Button
        icon="pi pi-pencil"
        class="p-button-text p-button-rounded min-w-[48px] min-h-[48px] p-3"
        @click="editDialogRef?.open()"
        aria-label="Edit task"
      />
      <Button
        icon="pi pi-trash"
        class="p-button-text p-button-rounded min-w-[48px] min-h-[48px] p-3"
        @click="deleteDialogRef?.open()"
        aria-label="Delete task"
      />
    </div>

    <DeleteDialog
      ref="deleteDialogRef"
      :taskId="task.id"
      @confirm="handleDelete"
    />

    <EditDialog
      ref="editDialogRef"
      :taskId="task.id"
      :currentTitle="task.title"
      @save="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import DeleteDialog from './DeleteDialog.vue'
import EditDialog from './EditDialog.vue'

const props = defineProps<{
  task: {
    id: string
    title: string
    completed: boolean
    createdAt: Date
  }
}>()

const taskStore = useTaskStore()
const deleteDialogRef = ref<InstanceType<typeof DeleteDialog> | null>(null)
const editDialogRef = ref<InstanceType<typeof EditDialog> | null>(null)

const handleToggle = () => {
  taskStore.toggleTask(props.task.id)
}

const handleEdit = (taskId: string, newTitle: string) => {
  taskStore.editTask(taskId, newTitle)
}

const handleDelete = (taskId: string) => {
  taskStore.deleteTask(taskId)
}
</script>

<style scoped>
/* Only keeping styles that can't be done with Tailwind */
@media (min-width: 768px) {
  .task-item:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .task-actions button:hover {
    background-color: var(--surface-hover);
  }
}
</style> 