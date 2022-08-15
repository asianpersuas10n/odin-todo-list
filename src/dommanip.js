import {projectArr, currentProject, updateStorage,} from "./index.js"

const projectContainer = document.querySelector("#projectContainer")
const todoContainer = document.querySelector("#todoContainer")
const submitProject = document.querySelector("#submitProject")
const submitTodo = document.querySelector("#submitTodo")
let titleInput = false
let dateInput = false

function domManip() {
    projectContainer.innerHTML = ""
    todoContainer.innerHTML= ""
    projectArr.forEach(project => {
        projectToHtml(project);
    });
    currentProject.list.forEach(task => {
        taskToHtml(task)
    })
}; 

function projectToHtml(project) {
    const _projectContainer = document.querySelector("#projectContainer")
    const _div = document.createElement("div")
    const _button = document.createElement("button")
    const _button2 = document.createElement("button")
    _button.textContent = `${project.name}`
    _div.appendChild(_button)
    _button2.textContent = "X"
    _div.appendChild(_button2)
    _projectContainer.append(_div)

    document.querySelector("#title").textContent = currentProject.name

    //project switch 
    _button.addEventListener("click", () => {
        currentProject = projectArr[projectArr.indexOf(project)]
        domManip()
        updateStorage()
    })

    //delete button
    _button2.addEventListener("click", () => {
        projectArr.splice(projectArr.indexOf(project), 1)
        domManip()
        updateStorage()
    })
}

function taskToHtml(task) {
    const _todoContainer = document.querySelector("#todoContainer")
    const _div = document.createElement("div")
    const _divInDiv = document.createElement("div")
    const _span = document.createElement("span")
    const _span2 = document.createElement("span")
    const _button2 = document.createElement("button")

    _span.textContent = `${task.title}`
    _divInDiv.appendChild(_span)
    _span2.textContent = task["due date"] === "" ? "No Due Date Set" : `${task["due date"]}`
    _divInDiv.appendChild(_span2)
    _div.appendChild(_divInDiv)
    _button2.textContent = "X"
    _div.appendChild(_button2)
    _todoContainer.appendChild(_div)

    _span.addEventListener("click", () => {
        if(titleInput === true) {return}
        titleInput = true
        _span.innerHTML = '<input type="text" value="' + _span.textContent + '" onblur="this.focus()" autofocus>'
        _span.firstChild.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                if(_span.firstChild.value === "") {return alert("Needs at least one character.")}
                task.title = _span.firstChild.value
                domManip()
                updateStorage()
                titleInput = false
            }
        })
    })

    _span2.addEventListener("click", () => {
        if(dateInput === true) {return}
        dateInput = true
        _span2.innerHTML = '<input type="date" value="' + _span.textContent + '" onblur="this.focus()" autofocus>'
        _span2.firstChild.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                task["due date"] = _span2.firstChild.value
                domManip()
                updateStorage()
                dateInput = false
            }
        })
    })

    _button2.addEventListener("click", () => {
        currentProject.list.splice(currentProject.list.indexOf(task), 1)
        domManip()
        updateStorage()
    })
}

export {
    domManip,
    projectContainer,
    todoContainer,
    submitProject,
    submitTodo,
}