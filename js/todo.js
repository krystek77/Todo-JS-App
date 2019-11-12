let id = 0;

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
