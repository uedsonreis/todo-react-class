import { NavLink } from "react-router"

import type { Route } from "./+types/list.project"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "App de Projetos" },
        { name: "description", content: "Gerencie seus projetos" },
    ]
}

export default function ProjectList() {
    return (
        <div className="container">
            <header className="header">
                <h2>Lista de Projetos</h2>
            </header>

            <main className="w-full">
                <NavLink to="/projeto/create">Adicionar</NavLink>
            </main>
            
            <footer className="footer">

            </footer>
        </div>
    )
}
