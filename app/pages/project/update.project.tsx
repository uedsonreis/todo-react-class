import React from "react"
import { useNavigate, useParams } from "react-router"

import type { Route } from "./+types/list.project"

import * as projectRepo from "../../services/project.repo"
import MyInput from "~/components/my.input"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Editar um Projeto" }
    ]
}

export default function UpdateProject() {

    const navigate = useNavigate()
    const route = useParams<{ id: string }>()

    const project = projectRepo.getProject(Number(route.id!))

    if (!project) return <div className="container">Projeto não encontrado!</div>

    const [name, setName] = React.useState(project.name)
    const [description, setDescription] = React.useState(project.description || "")
    const [deadline, setDeadline] = React.useState(project.deadline ? project.deadline.toISOString().substring(0, 10) : "")

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!name || name == '') {
            alert("Por favor, informe o nome do projeto.")
            return
        }

        let date = undefined
        if (deadline && deadline != '') date = new Date(`${deadline} GMT-03:00`)

        projectRepo.updateProject({ ...project, name, description, deadline: date })
        goBack()
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Editar Projeto</h2>
            </header>

            <main className="flex flex-col justify-center min-h-[300px]">
                <MyInput className="mb-5" title="Nome" value={name} change={setName} />

                <MyInput className="mb-5" type='date' title="Prazo" value={deadline} change={setDeadline} />

                <div className="div-input">
                    <span className="mr-5">Descrição:</span>
                    <textarea className="my-input" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

            </main>
            
            <footer className="footer">
                <button className="my-button color-gray" onClick={goBack}>
                    Cancelar
                </button>
                
                <button className="my-button color-green" onClick={save}>
                    Salvar
                </button>
            </footer>
        </div>
    )
}
