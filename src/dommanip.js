import {projectArr, currentProject,} from "./index.js"

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

    _button.addEventListener("click", () => {
        for (let i = 0; i < projectArr.length; i++) {
            if (_button.textContent.includes(projectArr[i].name)) {
              currentProject = projectArr[i];
            }
        }
        domManip()
    })

    _button2.addEventListener("click", () => {
        projectArr.splice(projectArr.indexOf(project), 1)
        domManip()
    })
}

function taskToHtml(task) {
    const _todoContainer = document.querySelector("#todoContainer")
    const _div = document.createElement("div")
    const _button = document.createElement("button")
    const _span = document.createElement("span")
    const _span2 = document.createElement("span")
    const _button2 = document.createElement("button")

    _span.textContent = `${task.title}`
    _button.appendChild(_span)
    _span2.textContent = `${task["due date"]}`
    _button.appendChild(_span2)
    _div.appendChild(_button)
    _button2.textContent = "X"
    _div.appendChild(_button2)
    _todoContainer.appendChild(_div)

    _button2.addEventListener("click", () => {
        currentProject.list.splice(currentProject.list.indexOf(task), 1)
        domManip()
    })
}

export {
    domManip,
}