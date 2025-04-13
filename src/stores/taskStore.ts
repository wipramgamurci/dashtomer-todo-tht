import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const STORAGE_KEY = 'todo-tasks'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  function addTask(title: string) {
    if (!title.trim()) return

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    }

    tasks.value.push(newTask)
    saveToLocalStorage()
  }

  function editTask(id: string, newTitle: string) {
    const task = tasks.value.find((task: Task) => task.id === id)
    if (task) {
      task.title = newTitle.trim()
      saveToLocalStorage()
    }
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((task: Task) => task.id !== id)
    saveToLocalStorage()
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((task: Task) => task.id === id)
    if (task) {
      task.completed = !task.completed
      saveToLocalStorage()
    }
  }

  function saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error)
    }
  }

  function loadFromLocalStorage() {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY)
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks)
        tasks.value = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error)
      localStorage.removeItem(STORAGE_KEY)
      tasks.value = []
    }
  }

  // Load tasks on store initialization
  loadFromLocalStorage()

  return {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTask
  }
}) 