<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const newTaskTitle = ref('')
const editingTaskId = ref('')
const editingTaskTitle = ref('')

// Load tasks from localStorage when component mounts
onMounted(() => {
  taskStore.loadFromLocalStorage()
})

const handleAddTask = () => {
  taskStore.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}

const startEdit = (task: { id: string, title: string }) => {
  editingTaskId.value = task.id
  editingTaskTitle.value = task.title
}

const handleEditTask = () => {
  taskStore.editTask(editingTaskId.value, editingTaskTitle.value)
  editingTaskId.value = ''
  editingTaskTitle.value = ''
}

const handleDeleteTask = (id: string) => {
  taskStore.deleteTask(id)
}

const handleToggleTask = (id: string) => {
  taskStore.toggleTask(id)
}

const clearLocalStorage = () => {
  localStorage.removeItem('todo-tasks')
  taskStore.$reset() // This will reset the store state
}
</script>

<template>
  <div class="p-4 border rounded">
    <h2 class="text-lg font-semibold mb-4">Store Test</h2>
    
    <!-- Add Task Form -->
    <div class="mb-4">
      <h3 class="font-medium mb-2">Add Task:</h3>
      <div class="flex gap-2">
        <InputText v-model="newTaskTitle" placeholder="Enter task title..." class="flex-1" />
        <Button label="Add" @click="handleAddTask" />
      </div>
    </div>

    <!-- Tasks List -->
    <div>
      <h3 class="font-medium mb-2">Current Tasks:</h3>
      <div v-if="tasks.length === 0" class="text-gray-500">
        No tasks yet
      </div>
      <div v-else class="space-y-2">
        <div v-for="task in tasks" :key="task.id" class="flex items-center gap-2 p-2 border rounded">
          <Checkbox :modelValue="task.completed" @change="() => handleToggleTask(task.id)" binary />
          
          <template v-if="editingTaskId === task.id">
            <InputText v-model="editingTaskTitle" class="flex-1" />
            <Button label="Save" @click="handleEditTask" />
          </template>
          <template v-else>
            <span :class="{ 'line-through': task.completed }" class="flex-1">
              {{ task.title }}
            </span>
            <Button icon="pi pi-pencil" class="p-button-text" @click="() => startEdit(task)" />
            <Button icon="pi pi-trash" class="p-button-text" @click="() => handleDeleteTask(task.id)" />
          </template>
        </div>
      </div>
    </div>

    <!-- LocalStorage Controls -->
    <div class="mt-4">
      <h3 class="font-medium mb-2">LocalStorage Controls:</h3>
      <div class="flex gap-2">
        <Button label="Clear LocalStorage" severity="danger" @click="clearLocalStorage" />
      </div>
    </div>

    <!-- Raw State Display -->
    <div class="mt-4">
      <h3 class="font-medium mb-2">Raw State:</h3>
      <pre class="bg-gray-100 p-2 rounded overflow-auto">{{ tasks }}</pre>
    </div>
  </div>
</template> 