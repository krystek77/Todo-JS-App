let id = 0;
const taskList = document.querySelector('.todo-application--task-lists');
const addIcon = document.querySelector('.icon__add');

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

Task.prototype.toString = function() {
	console.log(`
		Task: ID=${this.id};
		content=${this.content};
		done=${this.done};
		trash=${this.trash}
		`);
};
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

	const CHECK = 'fas fa-check-circle';
	const UNCHECK = 'fa fa-circle';
	const DONE = done ? CHECK : UNCHECK;

	const position = 'beforeend';

	const element = `
		<li class="todo-application--task">
			<i class="fa ${DONE} icon icon__done todo-application--icon" id="${id}"></i>
			<p class="todo-application--content">${content}</p>
			<i class="fa fa-trash-alt icon icon__trash todo-application--icon" id="${id}"></i>
		</li>`;

	taskList.insertAdjacentHTML(position, element);
}
