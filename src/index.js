import {domManip} from "./dommanip.js"

const projectContainer = document.querySelector("#projectContainer")
const todoContainer = document.querySelector("#todoContainer")
const submitProject = document.querySelector("#submitProject")
const submitTodo = document.querySelector("#submitTodo")

let currentProject = {name: "default", list: [{title: "This is a todo example.", "due date": "10/10/2022"}],}

let projectArr = [{name: "default", list: [{title: "This is a todo example.", "due date": "10/10/2022"}],}]

function projects(name) {
    return {
        "name": name,
         list: [],
    }
}

function todos(title, dueDate) {
    return {
        "title": title,
        "due date": dueDate,
    }
}

function createProject() {
    const _newProject = document.querySelector("#newProject").value
    if (_newProject === "") {return}
    projectArr.push(projects(_newProject))
    domManip()
    document.querySelector("#newProject").value = ""
    document.querySelector("#projectContainer").lastChild.firstChild.click()
}

function createTodo(project) {
    const _newTodo = document.querySelector("#newTodo").value
    if (_newTodo === "") {return}
    const _newTodoDate = document.querySelector("#newTodoDate").value
    projectArr[projectArr.indexOf(project)].list.push(todos(_newTodo, _newTodoDate))
    domManip()
    document.querySelector("#newTodo").value = ""
}

submitProject.addEventListener("click", createProject)


submitTodo.addEventListener("click", () => {
    if (projectArr[0] === undefined) {return}
    createTodo(currentProject)
})


domManip()
document.querySelector("#projectContainer").lastChild.firstChild.click()




export {
    projectArr,
    currentProject,
}