import React from "react"
import { useNavigate } from "react-router"

import type { Route } from "./+types/list.project"

import { addProject } from "../../services/project.repo"
import MyInput from "~/components/my.input"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Criar ou Editar um Projeto" }
    ]
}

export default function CreateProject() {

    const navigate = useNavigate()

    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [deadline, setDeadline] = React.useState("")

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!name || name == '') {
            alert("Por favor, informe o nome do projeto.")
            return
        }

        let date = undefined
        if (deadline && deadline != '') date = new Date(deadline)

        const project = { name, description, deadline: date }

        console.log('Salvando projeto: ', project)
        const saved = addProject(project)

        if (saved) {
            goBack()
        } else {
            alert("Já existe um projeto com esse nome. Por favor, escolha outro nome.")
        }
    }

    return (
        <div className="container">
            <header className="header">
                <h2>Criar novo Projeto</h2>
            </header>

            <main className="flex flex-col justify-center min-h-[300px]">
                <MyInput className="mb-5" title="Nome" change={setName} />

                <MyInput className="mb-5" type='date' title="Prazo" change={setDeadline} />

                <MyInput title="Descrição" change={setDescription} />

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
