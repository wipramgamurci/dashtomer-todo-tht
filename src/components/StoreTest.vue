<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
</script>

<template>
  <div class="p-4 border rounded">
    <h2 class="text-lg font-semibold mb-4">Store Test</h2>
    <div class="space-y-4">
      <div>
        <h3 class="font-medium">Current Tasks:</h3>
        <pre class="bg-gray-100 p-2 rounded">{{ tasks }}</pre>
      </div>
    </div>
  </div>
</template> 