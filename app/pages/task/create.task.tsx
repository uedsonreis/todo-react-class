import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

import type { Route } from "./+types/list.task"

import * as taskRepo from "../../services/task.repo"
import MyInput from "~/components/my.input"
import type { ThemeState } from "~/store/theme.slice"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Criar uma Tarefa" }
    ]
}

export default function CreateTask() {

    const navigate = useNavigate()
    const theme = useSelector((state: { theme: ThemeState }) => state.theme)

    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!title || title == '') {
            alert("Por favor, informe o Título da tarefa.")
            return
        }

        taskRepo.add({ title, description, done: false })
        goBack()
    }

    return (
        <div className={`page ${theme.mode}`}>
            <header className="header">
                <h2>Criar nova Tarefa</h2>
            </header>

            <main className="flex flex-col justify-center min-h-[300px]">
                <MyInput className="mb-5" title="Título" change={setTitle} />

                <div className="div-input">
                    <span className="mr-5">Descrição:</span>
                    <textarea className="my-input" onChange={(e) => setDescription(e.target.value)} />
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
