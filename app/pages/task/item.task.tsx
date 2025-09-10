import React from "react"

import type { Task } from "~/models"

type Props = {
    task: Task
    onEdit: (task: Task) => void
    onDelete: (task: Task) => void
}

export default function TaskItem({ task, onEdit, onDelete }: Props) {

    return (
        <div className={`task-item ${task.done ? 'color-green' : ''}`}>
            <div>
                {task.title}
            </div>
            <div className="flex">
                <button className="my-button color-blue" onClick={() => onEdit(task)}>Alterar</button>
                <button className="my-button color-red" onClick={() => onDelete(task)}>Remover</button>
            </div>
        </div>
    )
}