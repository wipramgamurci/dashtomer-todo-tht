<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'

const visible = ref(false)
const checked = ref(false)
const text = ref('')
</script>

<template>
  <div class="container mx-auto max-w-2xl px-8 py-8">
    <h1 class="text-2xl font-bold mb-6">PrimeVue Components Test</h1>
    
    <div class="bg-white rounded-lg shadow-md p-8">
      <div class="space-y-6">
        <!-- InputText Test -->
        <div>
          <h2 class="text-lg font-semibold mb-2">InputText Test</h2>
          <InputText v-model="text" placeholder="Enter task..." class="w-full" />
          <p class="mt-2 text-gray-600">Input value: {{ text }}</p>
        </div>
        
        <!-- Checkbox Test -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Checkbox Test</h2>
          <div class="flex items-center">
            <Checkbox v-model="checked" binary />
            <label class="ml-2">Mark as complete</label>
          </div>
          <p class="mt-2 text-gray-600">Checkbox value: {{ checked }}</p>
        </div>
        
        <!-- Button Test -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Button Test</h2>
          <Button label="Open Dialog" @click="visible = true" />
        </div>
        
        <!-- Dialog Test -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Dialog Test</h2>
          <Dialog v-model:visible="visible" modal header="Dialog Test" :style="{ width: '50vw' }">
            <p>This is a test dialog. Click outside or press ESC to close.</p>
            <p class="mt-2 text-gray-600">Dialog visible state: {{ visible }}</p>
            <template #footer>
              <Button label="Close" @click="visible = false" />
            </template>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* We can remove all the custom styles since we're using Tailwind now */
</style>
