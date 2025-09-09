import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("./pages/task/list.task.tsx"),
    route("task/create", "./pages/task/create.task.tsx"),
    route("task/update/:id", "./pages/task/update.task.tsx"),
] satisfies RouteConfig
