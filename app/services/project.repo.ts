import type { Project } from "~/models"

const storeKey = '@PROJECTS:REPO'

function persist(list: Project[]) {
    localStorage.setItem(storeKey, JSON.stringify(list))
}

export function getProjects(): Project[] {
    const json = localStorage.getItem(storeKey)
    return json ? JSON.parse(json) : []
}

export function addProject(project: Project) {
    const projects = getProjects()

    const projectDB = projects.find(p => p.name == project.name)
    if (projectDB) return false

    projects.push(project)
    persist(projects)

    return true
}

export function updateProject(project: Project) {
    const projects = getProjects()
    
    const projectDB = projects.find(p => p.name == project.name)
    if (!projectDB) return false

    projectDB.deadline = project.deadline
    projectDB.description = project.description

    persist(projects)
    return true
}

export function deleteProject(project: Project) {
    let projects = getProjects()
    
    projects = projects.filter(p => p.name != project.name)

    persist(projects)
    return true
}
