import { createSlice, type Dispatch } from '@reduxjs/toolkit'

import type { Task } from '~/models'

export type TaskState = {
    tasks: Task[],
    selected?: Task,
}

const initialState: TaskState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'task', initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = state.tasks.find(t => t.id == action.payload)
        },
        add: (state, action) => {
            action.payload.id = state.tasks.length + 1
            state.tasks.push(action.payload)
        },
        update: (state, action) => {
            const taskDB = state.tasks.find(t => t.id == action.payload.id)
            if (taskDB) {
                taskDB.title = action.payload.title
                taskDB.description = action.payload.description
                taskDB.done = action.payload.done
            }
        },
        remove: (state, action) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload)
        }
    }
})

export function setSelectedAction(dispatch: Dispatch<any>, id: number) {
    dispatch(taskSlice.actions.setSelected(id))
}

export function addTaskAction(dispatch: Dispatch<any>, task: Task) {
    dispatch(taskSlice.actions.add(task))
}

export function updateTaskAction(dispatch: Dispatch<any>, task: Task) {
    dispatch(taskSlice.actions.update(task))
}

export function removeTaskAction(dispatch: Dispatch<any>, id: number) {
    dispatch(taskSlice.actions.remove(id))
}