import type { Task } from "~/models"

const storeKey = '@TODO_APP:TASK_REPO'

function persist(list: Task[]) {
    localStorage.setItem(storeKey, JSON.stringify(list))
}

export function getList(): Task[] {
    const json = localStorage.getItem(storeKey)
    return json ? JSON.parse(json) : []
}

export function get(id: number) {
    let tasks = getList()
    const task = tasks.find(p => p.id == id)
    return task
}

export function add(task: Task) {
    const tasks = getList()

    task.id = tasks.length + 1

    tasks.push(task)
    persist(tasks)

    return task.id
}

export function update(task: Task) {
    const tasks = getList()
    
    const taskDB = tasks.find(p => p.id == task.id)
    if (!taskDB) return false

    taskDB.title = task.title
    taskDB.done = task.done
    taskDB.description = task.description

    persist(tasks)
    return true
}

export function remove(id: number) {
    let tasks = getList()
    
    tasks = tasks.filter(p => p.id != id)

    persist(tasks)
}
