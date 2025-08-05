import React from "react"

import type { Project } from "~/models"

type Props = {
    project: Project
    onEdit: (project: Project) => void
    onDelete: (project: Project) => void
}

export default function ProjectItem({ project, onEdit, onDelete }: Props) {

    function format(date: Date | undefined): string {
        if (!date) return "Sem prazo definido"
        date = new Date(date)
        return `Prazo: ${date.toLocaleDateString('pt-BR')}`
    }

    function onDeadline(deadline: Date | undefined): boolean {
        if (!deadline) return true
        deadline = new Date(deadline)
        return deadline.getTime() >= new Date().getTime()
    }

    return (
        <div className={`project-item ${onDeadline(project.deadline) ? '' : 'color-orange'}`}>
            <div>
                {project.name}
            </div>
            <div className="flex">
                <div style={{ textAlign: 'center', width: '200px', marginLeft: '20px', marginRight: '20px' }}>
                    {format(project.deadline)}
                </div>

                <button className="my-button color-cyan" onClick={() => onEdit(project)}>Alterar</button>
                <button className="my-button color-red" onClick={() => onDelete(project)}>Remover</button>
            </div>
        </div>
    )
}