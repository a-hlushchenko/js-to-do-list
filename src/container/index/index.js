export class Todo {
    static #list = []
    static #count = 0

    static #createTaskData = (text) => {
        this.#list.push({
            id: ++this.#count,
            text,
            done: false
        })
    }

    static #block = null;
    static #template = null;
    static #input = null;
    static #button = null;

    static init = () => {
        this.#block = document.querySelector('.task-list')
        this.#template = document.getElementById('task').content.firstElementChild
        this.#input = document.querySelector('.add-input')
        this.#button = document.querySelector('.add-button')

        this.#button.onclick = () => {this.#handleAdd()}
    }

    
    static #handleAdd = () => {
        const text = this.#input.value
        if (text.length > 0) {
            this.#createTaskData(text)
            this.#input.value = ''
        }
    }
}

Todo.init()

window.todo = Todo