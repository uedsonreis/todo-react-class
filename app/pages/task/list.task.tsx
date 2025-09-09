import React from "react"
import { NavLink, useNavigate } from "react-router"

import type { Route } from "./+types/list.task"

import type { Task } from "~/models"
import * as taskRepo from '../../services/task.repo'

import TaskItem from "./item.task"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "App de Tarefas" },
        { name: "description", content: "Gerencie suas Tarefas" },
    ]
}

export default function TaskList() {

    const navigate = useNavigate()

    const [tasks, setTasks] = React.useState(taskRepo.getList())

    function onEdit(task: Task) {
        navigate(`/task/update/${task.id}`)
    }

    function onDelete(task: Task) {
        taskRepo.remove(task.id!)
        setTasks(taskRepo.getList())
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Lista de Tarefas</h2>
            </header>

            <main className="w-full">
                <NavLink className='color-cyan' to="/task/create">Adicionar Tarefa</NavLink>
                <div className="flex flex-col m-5">
                    { tasks.map((task, index) => (
                        <TaskItem key={index} task={task} onEdit={onEdit} onDelete={onDelete} />
                    )) }
                </div>
            </main>
            
            <footer className="footer">
                {tasks.filter(t => t.done).length} tarefas concluídas.
            </footer>
        </div>
    )
}
