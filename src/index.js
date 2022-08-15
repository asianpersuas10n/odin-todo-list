/* eslint-disable no-undef */
import {
  domManip,
  projectContainer,
  submitProject,
  submitTodo,
} from "./dommanip.js";

let currentProject = {};
let projectArr = [];

if (localStorage.getItem("allProjects") === null) {
  currentProject = {
    name: "default",
    list: [{ title: "This is a todo example.", "due date": "10/10/2022" }],
  };
  projectArr = [
    {
      name: "default",
      list: [{ title: "This is a todo example.", "due date": "10/10/2022" }],
    },
  ];
} else {
  currentProject = JSON.parse(localStorage.getItem("selectedProject"));
  projectArr = JSON.parse(localStorage.getItem("allProjects"));
}

function updateStorage() {
  localStorage.setItem("selectedProject", JSON.stringify(currentProject));
  localStorage.setItem("allProjects", JSON.stringify(projectArr));
}

function projects(name) {
  return {
    name,
    list: [],
  };
}

function todos(title, dueDate) {
  return {
    title,
    "due date": dueDate,
  };
}

function createProject() {
  const _newProject = document.querySelector("#newProject").value;
  if (_newProject === "") {
    return;
  }
  projectArr.push(projects(_newProject));
  domManip();
  updateStorage();
  document.querySelector("#newProject").value = "";
  projectContainer.lastChild.firstChild.click();
}

function createTodo(project) {
  const _newTodo = document.querySelector("#newTodo").value;
  if (_newTodo === "") {
    return;
  }
  const _newTodoDate = document.querySelector("#newTodoDate").value;
  projectArr[projectArr.indexOf(project)].list.push(
    todos(_newTodo, _newTodoDate)
  );
  domManip();
  updateStorage();
  document.querySelector("#newTodo").value = "";
}

submitProject.addEventListener("click", createProject);

submitTodo.addEventListener("click", () => {
  if (projectArr[0] === undefined) {
    return;
  }
  createTodo(currentProject);
});

domManip();
projectContainer.lastChild.firstChild.click();

export { projectArr, currentProject, updateStorage };
