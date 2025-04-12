import { defineStore } from 'pinia'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
  }),
}) 