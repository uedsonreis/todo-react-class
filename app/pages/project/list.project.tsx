import { NavLink } from "react-router"

import type { Route } from "./+types/list.project"

import * as projectRepo from '../../services/project.repo'

export function meta({}: Route.MetaArgs) {
    return [
        { title: "App de Projetos" },
        { name: "description", content: "Gerencie seus projetos" },
    ]
}

export default function ProjectList() {

    function format(date: Date | undefined): string {
        if (!date) return "Sem prazo definido"

        date = new Date(date)

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Lista de Projetos</h2>
            </header>

            <main className="w-full">
                <NavLink to="/projeto/create">Adicionar</NavLink>
            </main>
            
            <footer className="footer">
                <div className="flex flex-col w-full m-10">
                    { projectRepo.getProjects().map((project, index) => (
                        <div key={index} className="project-item">
                            <div>
                                {project.name}
                            </div>
                            <div>
                                {format(project.deadline)}
                            </div>
                        </div>
                    )) }
                </div>
            </footer>
        </div>
    )
}
