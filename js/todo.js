const taskList = document.querySelector(".todo-application--task-lists");
const addIcon = document.querySelector(".icon__add");
const input = document.querySelector(".todo-application--input");
const date = document.querySelector(".todo-application--date");
const clear = document.querySelector(".icon__clear");
const addBtn = document.querySelector(".icon__add");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

/**
 * Create Tsk object
 *
 * @param {String} content
 * @param {boolean} done
 * @param {boolean} trash
 */
function Task(content, done = false, trash = false) {
  id = id + 1;
  this.id = id;
  this.content = content;
  this.done = done;
  this.trash = trash;
}

Task.prototype.toString = function () {
  console.log(`
		Task: ID=${this.id};
		content=${this.content};
		done=${this.done};
		trash=${this.trash}
		`);
};
/**
 * Sets current data
 *
 * @param {HTMLElement} element
 */
function setDate(element) {
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
  };
  const today = new Date();
  element.innerHTML = today.toLocaleDateString("pl-PL", options);
}

let data = localStorage.getItem("TODO");
let list;
let id;

if (data) {
  list = JSON.parse(data);
  loadToDo(list);
  id = list.length;
} else {
  list = new Array();
  id = 0;
}

function loadToDo(list) {
  list.forEach(task => {
    addTask(task);
  });
}

setDate(date);

/**
 * Adds task to list of tasks after last child
 *
 * @param {Task} task
 */
function addTask(task) {
  const done = task.done;
  const trash = task.trash;
  const content = task.content;
  const id = task.id;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const position = "beforeend";

  const element = `
		<li class="todo-application--task">
			<i class="fas fa ${DONE} icon icon__done todo-application--icon" id="${id}" job="done"></i>
			<p class="todo-application--content ${LINE}">${content}</p>
			<i class="fa fa-trash-alt icon icon__trash todo-application--icon" id="${id}" job="trash"></i>
		</li>`;

  taskList.insertAdjacentHTML(position, element);
}
/**
 * Add task by add button
 * 
 */
function add() {
  console.log("Add task by add button");
  const value = input.value;
  if (value) {
    const content = value;
    const task = new Task(value);
    addTask(task);
    list.push(task);
    input.value = "";
  }


  localStorage.setItem("TODO", JSON.stringify(list));
}

addBtn.addEventListener('click', add);

document.addEventListener("keyup", function (event) {
  const keyCode = event.keyCode;
  if (keyCode === 13) {
    const value = input.value;
    if (value) {
      const content = value;
      const task = new Task(value);
      addTask(task);
      list.push(task);
      input.value = "";
    }
  }

  localStorage.setItem("TODO", JSON.stringify(list));
});



taskList.addEventListener("click", function (event) {
  if (event.target === this || event.target.localName === "p") return;

  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === "done") {
    completeTask(element);
  } else if (elementJob === "trash") {
    console.log("Remove task ... ");
    removeTask(element);
    removeFromList(element);
  }
  //update localstorage
  localStorage.setItem("TODO", JSON.stringify(list));
});

/**
 *
 * @param {HTMLElement} element
 */
function completeTask(element) {
  console.log(element);
  const index = element.id - 1;
  element.classList.toggle(UNCHECK);
  element.classList.toggle(CHECK);
  element.nextElementSibling.classList.toggle(LINE_THROUGH);
  list[index].done = list[index].done ? false : true;
}

/**
 *
 * @param {HTMLElement} element
 */
function removeTask(element) {
  const index = element.id - 1;
  element.parentNode.parentNode.removeChild(element.parentNode);
  list[index].trash = true;
}

clear.addEventListener("click", function (event) {
  localStorage.clear();
  location.reload();

});
/**
 * Remove from list
 * 
 * @param {HTML Element} element 
 */
function removeFromList(element) {
  const index = element.id;
  const newList = Array.from(list).filter((item) => {
    return item.id != index;
  })
  list = [...newList];
  console.log(list);
}