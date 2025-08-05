import type { Project } from "~/models"

const storeKey = '@PROJECTS:REPO'

function persist(list: Project[]) {
    localStorage.setItem(storeKey, JSON.stringify(list))
}

function getList(): Project[] {
    const json = localStorage.getItem(storeKey)
    return json ? JSON.parse(json) : []
}

function setDeadline(project: Project | undefined) {
    if (project && project.deadline) {
        project.deadline = new Date(project.deadline)
    }
}

export function getProjects(): Project[] {
    const projects = getList()

    projects.forEach(setDeadline)

    projects.sort((a, b) => {
        if (a.deadline && b.deadline) {
            return a.deadline.getTime() - b.deadline.getTime()
        }
        return 0
    })

    return projects
}

export function getProject(id: number) {
    let projects = getList()
    const project = projects.find(p => p.id == id)

    setDeadline(project)

    return project
}

export function addProject(project: Project) {
    const projects = getList()

    project.id = projects.length + 1

    projects.push(project)
    persist(projects)

    return project.id
}

export function updateProject(project: Project) {
    const projects = getList()
    
    const projectDB = projects.find(p => p.id == project.id)
    if (!projectDB) return false

    projectDB.name = project.name
    projectDB.deadline = project.deadline
    projectDB.description = project.description

    persist(projects)
    return true
}

export function deleteProject(id: number) {
    let projects = getList()
    
    projects = projects.filter(p => p.id != id)

    persist(projects)
}
