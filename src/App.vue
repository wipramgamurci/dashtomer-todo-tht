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
  <div class="container">
    <h1>PrimeVue Components Test</h1>
    
    <div class="card">
      <h2>InputText Test</h2>
      <InputText v-model="text" placeholder="Enter task..." class="w-full" />
      <p class="mt-2">Input value: {{ text }}</p>
      
      <h2 class="mt-4">Checkbox Test</h2>
      <div class="flex align-items-center">
        <Checkbox v-model="checked" binary />
        <label class="ml-2">Mark as complete</label>
      </div>
      <p class="mt-2">Checkbox value: {{ checked }}</p>
      
      <h2 class="mt-4">Button Test</h2>
      <Button label="Open Dialog" @click="visible = true" />
      
      <h2 class="mt-4">Dialog Test</h2>
      <Dialog v-model:visible="visible" modal header="Dialog Test" :style="{ width: '50vw' }">
        <p>This is a test dialog. Click outside or press ESC to close.</p>
        <p>Dialog visible state: {{ visible }}</p>
        <template #footer>
          <Button label="Close" @click="visible = false" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mt-4 {
  margin-top: 1.5rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.w-full {
  width: 100%;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
