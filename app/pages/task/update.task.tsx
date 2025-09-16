import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"

import type { Route } from "./+types/list.task"

import MyInput from "~/components/my.input"
import type { ThemeState } from "~/store/theme.slice"
import { updateTaskAction, type TaskState } from "~/store/task.slice"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Editar uma Tarefa" }
    ]
}

export default function UpdateTask() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const route = useParams<{ id: string }>()

    const theme = useSelector((state: { theme: ThemeState }) => state.theme)
    const task = useSelector((state: { task: TaskState }) => state.task.selected)

    if (!task) return <div className="container">Tarefa não encontrada!</div>

    const [title, setTitle] = React.useState(task.title)
    const [done, setDone] = React.useState(task.done)
    const [description, setDescription] = React.useState(task.description || "")

    function goBack() {
        navigate(-1)
    }

    function save() {
        if (!title || title == '') {
            alert("Por favor, informe o Título da tarefa.")
            return
        }

        updateTaskAction(dispatch, { ...task, title, description, done })
        goBack()
    }

    return (
        <div className={`page ${theme.mode}`}>
            <header className="header">
                <h2>Editar Tarefa</h2>
            </header>

            <main className="flex flex-col justify-center min-h-[300px]">
                <MyInput className="mb-5" title="Nome" value={title} change={setTitle} />

                <div className="div-input">
                    <span className="mr-5">Descrição:</span>
                    <textarea className="my-input" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="flex mt-5">
                    <span className="mr-5">Concluído:</span>
                    <input className="w-[24px]" type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} />
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
