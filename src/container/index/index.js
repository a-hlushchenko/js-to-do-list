export class Todo {
  static #NAME = 'todo'

  static #saveData = () => {
    window.localStorage.setItem(
      this.#NAME,
      JSON.stringify({
        list: this.#list,
        count: this.#count,
      }),
    )
  }

  static #loadData = () => {
    const data = window.localStorage.getItem(this.#NAME)

    if (data) {
      const { list, count } = JSON.parse(data)
      this.#list = list
      this.#count = count
    }
  }

  static #list = []
  static #count = 0

  static #createTaskData = (text) => {
    this.#list.push({
      id: ++this.#count,
      text,
      done: false,
    })
  }

  static #block = null
  static #template = null
  static #input = null
  static #button = null
  static #confirmDelModal = null
  static #confirmDelModalContent = null

  static init = () => {
    this.#block = document.querySelector('.task-list')
    this.#template =
      document.getElementById(
        'task',
      ).content.firstElementChild
    this.#input = document.querySelector('.add-input')
    this.#button = document.querySelector('.add-button')
    this.#confirmDelModal =
      document.getElementById('confirm-del')
    this.#confirmDelModalContent =
      this.#confirmDelModal.querySelector('.confirm-del')

    this.#button.onclick = () => {
      this.#handleAdd()
    }

    this.#loadData()
    this.#render()
  }

  static #handleAdd = () => {
    const text = this.#input.value

    if (text.length > 0) {
      this.#createTaskData(text)
      this.#input.value = ''
    }

    this.#saveData()
    this.#render()
  }

  static #render = () => {
    this.#block.innerHTML = ''

    if (this.#list.length === 0) {
      this.#block.innerText = 'Список задач пустий'
    } else {
      this.#list.forEach((taskData) => {
        const el = this.#createTaskElem(taskData)
        this.#block.append(el)
        if (taskData.done) {
          el.classList.toggle('task-done', true)
        }
      })
    }
  }

  static #createTaskElem = (data) => {
    const el = this.#template.cloneNode(true)

    const [id, text] =
      el.querySelector('.task-content').children

    const [btnDo, btnCancel] =
      el.querySelector('.task-actions').children

    id.innerText = `${data.id}.`
    text.innerText = data.text

    btnCancel.onclick = this.#confirmDel(data)

    btnDo.onclick = this.#handleDo(data, el)

    return el
  }

  static #handleDo = (data, el) => () => {
    const result = this.#toggleDone(data.id)

    if (result === true || result === false) {
      el.classList.toggle('task-done')
    }

    this.#saveData()
  }

  static #toggleDone = (id) => {
    const task = this.#list.find((item) => item.id === id)

    if (task) {
      task.done = !task.done

      return task.done
    } else {
      return null
    }
  }

  static #handleCancel = (data) => {
    const result = this.#deleteById(data.id)
    if (result) this.#render()

    this.#saveData()
  }

  static #deleteById = (id) => {
    this.#list = this.#list.filter((item) => item.id !== id)

    return true
  }

  static #confirmDel = (data) => () => {
    this.#openConfirmDel()

    const btnCanc = this.#confirmDelModal.querySelector(
      '.confirm-del-cancel',
    )
    const btnDel = this.#confirmDelModal.querySelector(
      '.confirm-del-delete',
    )

    btnCanc.onclick = () => {
      this.#closeConfirmDel()
    }

    btnDel.onclick = () => {
      this.#closeConfirmDel()
      this.#handleCancel(data)
    }
  }

  static #openConfirmDel = () => {
    this.#confirmDelModalContent.style.setProperty(
      'scale',
      '1',
    )
    this.#confirmDelModal.style.setProperty('opacity', '1')
    this.#confirmDelModal.style.setProperty(
      'pointer-events',
      'auto',
    )

    if (
      window
        .getComputedStyle(document.body)
        .height.slice(0, -2) >= window.innerHeight
    ) {
      document.body.style.setProperty('overflow', 'hidden')
      document.body.style.setProperty(
        'margin-right',
        '16px',
      )
    }
  }

  static #closeConfirmDel = () => {
    this.#confirmDelModalContent.style.setProperty(
      'scale',
      '0.4',
    )
    this.#confirmDelModal.style.setProperty('opacity', '0')
    this.#confirmDelModal.style.setProperty(
      'pointer-events',
      'none',
    )
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('margin-right')
  }
}

Todo.init()

window.todo = Todo
