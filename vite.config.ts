import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { config } from 'dotenv'

config()

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
})
