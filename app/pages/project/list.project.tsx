import React from "react"
import { NavLink, useNavigate } from "react-router"

import type { Route } from "./+types/list.project"

import type { Project } from "~/models"
import * as projectRepo from '../../services/project.repo'

import ProjectItem from "./item.project"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "App de Projetos" },
        { name: "description", content: "Gerencie seus projetos" },
    ]
}

export default function ProjectList() {

    const navigate = useNavigate()

    const [projects, setProjects] = React.useState(projectRepo.getProjects())

    function onEdit(project: Project) {
        navigate(`/projeto/update/${project.id}`)
    }

    function onDelete(project: Project) {
        projectRepo.deleteProject(project.id!)
        setProjects(projectRepo.getProjects())
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Lista de Projetos</h2>
            </header>

            <main className="w-full">
                <NavLink to="/projeto/create">Adicionar Projeto</NavLink>
                <div className="flex flex-col m-5">
                    { projects.map((project, index) => (
                        <ProjectItem key={index} project={project} onEdit={onEdit} onDelete={onDelete} />
                    )) }
                </div>
            </main>
            
            <footer className="footer">
                
            </footer>
        </div>
    )
}
