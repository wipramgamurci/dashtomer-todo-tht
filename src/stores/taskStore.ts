import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const STORAGE_KEY = 'todo-tasks'

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
      this.saveToLocalStorage()
    },

    editTask(id: string, newTitle: string) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.title = newTitle.trim()
        this.saveToLocalStorage()
      }
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter(task => task.id !== id)
      this.saveToLocalStorage()
    },

    toggleTask(id: string) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
      } catch (error) {
        console.error('Failed to save tasks to localStorage:', error)
      }
    },

    loadFromLocalStorage() {
      try {
        const storedTasks = localStorage.getItem(STORAGE_KEY)
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks)
          // Convert string dates back to Date objects
          this.tasks = parsedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt)
          }))
        }
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error)
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY)
        this.tasks = []
      }
    }
  },

  // Load tasks when store is created
  getters: {
    getTasks: (state) => state.tasks
  }
}) 