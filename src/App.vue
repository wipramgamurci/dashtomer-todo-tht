<script setup lang="ts">
import AddTaskForm from './components/form/AddTaskForm.vue'
import TaskList from './components/task/TaskList.vue'
</script>

<template>
  <div class="container mx-auto max-w-2xl px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Todo App</h1>
    
    <!-- Add Task Form -->
    <AddTaskForm class="mb-8" />
    
    <!-- Tasks List -->
    <TaskList />
  </div>
</template>

<style>

</style>
