import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

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

  actions: {
    addTask(title: string) {
      if (!title.trim()) return

      const newTask: Task = {
        id: uuidv4(),
        title: title.trim(),
        completed: false,
        createdAt: new Date()
      }

      this.tasks.push(newTask)
    },

    editTask(id: string, newTitle: string) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.title = newTitle.trim()
      }
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },

    toggleTask(id: string) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
      }
    }
  }
}) 