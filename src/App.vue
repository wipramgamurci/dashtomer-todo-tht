<script setup lang="ts">
import AddTaskForm from './components/AddTaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Todo App</h1>
    
    <!-- Add Task Form -->
    <AddTaskForm class="mb-8" />
    
    <!-- Tasks List -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Tasks</h2>
      <div v-if="taskStore.tasks.length === 0" class="text-gray-500 text-center py-4">
        No tasks yet. Add your first task!
      </div>
      <div v-else class="space-y-2">
        <TaskItem
          v-for="task in taskStore.tasks"
          :key="task.id"
          :task="task"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* No custom styles needed - using Tailwind */
</style>
