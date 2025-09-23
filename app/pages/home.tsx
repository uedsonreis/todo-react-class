import React from "react"
import { useSelector } from "react-redux"
import type { ThemeState } from "~/store/theme.slice"
import type { Route } from "../+types/root"
import { useSearchParams } from "react-router"

const URL = 'https://github.com/login/oauth/access_token'

export async function loader({ request }: Route.LoaderArgs) {
    const code = request.url.split('?code=')[1]

    // const urlParams = new URLSearchParams(request.url)
    // const code = urlParams.get('code')

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            code,
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET
        })
    })

    const { access_token } = await response.json()
    return access_token
}

export default function HomePage({ loaderData } : Route.ComponentProps) {

    const theme = useSelector((state: { theme: ThemeState }) => state.theme)

    const [name, setName] = React.useState('')

    async function fetchUserData() {
        const response = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${loaderData}`
            },
        })

        const data = await response.json()
        setName(data.name)
    }

    React.useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className={`page ${theme.mode}`}>
            <header>Página Inicial</header>

            <main>
                <h1>Bem-vindo {name}</h1>
            </main>
        </div>
    )
}