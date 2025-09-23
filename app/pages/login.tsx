import { useSelector } from "react-redux"
import type { ThemeState } from "~/store/theme.slice"

const clientId = import.meta.env.VITE_CLIENT_ID
const authServerUrl = 'https://github.com/login/oauth/authorize'

export default function LoginPage() {

    const theme = useSelector((state: { theme: ThemeState }) => state.theme)

    function signInGithub() {
        window.open(`${authServerUrl}?client_id=${clientId}&scope=user:email`, '_self')
    }

    return (
        <div className={`page ${theme.mode}`}>
            <header>
                <h1>Página de Acesso</h1>
            </header>

            <main>
                <button className="githubButton" onClick={signInGithub}>
                    Entrar com GitHub
                </button>
            </main>
        </div>
    )
}