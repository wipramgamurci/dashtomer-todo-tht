<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold mb-4">Tasks</h2>
    <div v-if="tasks.length === 0" class="text-gray-500 text-center py-4">
      No tasks yet. Add your first task!
    </div>
    <div v-else class="space-y-2">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)
</script>

<style>

</style> 