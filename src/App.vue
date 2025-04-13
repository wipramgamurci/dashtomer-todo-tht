<script setup lang="ts">
import AddTaskForm from './components/AddTaskForm.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Todo App</h1>
    
    <!-- Add Task Form -->
    <AddTaskForm class="mb-8" />
    
    <!-- Tasks List (to be implemented) -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold mb-4">Tasks</h2>
      <div v-if="taskStore.tasks.length === 0" class="text-gray-500 text-center py-4">
        No tasks yet. Add your first task!
      </div>
      <div v-else>
        <!-- TaskList component will go here -->
        <pre class="text-sm">{{ taskStore.tasks }}</pre>
      </div>
    </div>
  </div>
</template>

<style>
/* Global styles can go here if needed */
</style>
