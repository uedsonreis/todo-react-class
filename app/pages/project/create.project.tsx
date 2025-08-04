import type { Route } from "./+types/list.project"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Criar ou Editar um Projeto" }
    ]
}

export default function CreateProject() {
    return (
        <div className="container">
            <header className="header">
                <h2>Criar novo Projeto</h2>
            </header>

            <main>
                <div className="div-input mb-5">
                    <span className="mr-5">Nome:</span>
                    <input className="my-input" type="text" onChange={() => {}} />
                </div>

                <div className="div-input mb-5">
                    <span className="mr-5">Prazo:</span>
                    <input className="my-input" type="date" onChange={() => {}} />
                </div>

                <div className="div-input">
                    <span className="mr-5">Descrição:</span>
                    <textarea className="my-input" onChange={() => {}} />
                </div>

            </main>
            
            <footer className="footer">
                <button className="my-button color-gray" onClick={() => {}}>
                    Cancelar
                </button>
                
                <button className="my-button color-green" onClick={() => {}}>
                    Salvar
                </button>
            </footer>
        </div>
    )
}
