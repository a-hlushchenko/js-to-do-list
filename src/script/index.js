// static #confirmDel = (data) => {
//     this.#confirmModal.style.setProperty('opacity', '1')
//     this.#confirmModal.style.setProperty(
//       'pointer-events',
//       'auto',
//     )

//     const btnCanc = this.#confirmModal.querySelector(
//       '.confirm-del-cancel',
//     )
//     const btnDel = this.#confirmModal.querySelector(
//       '.confirm-del-delete',
//     )

//     btnCanc.onclick = () => {
//       this.#confirmModal.style.setProperty('opacity', '0')
//       this.#confirmModal.style.setProperty(
//         'pointer-events',
//         'none',
//       )
//     }

//     btnDel.onclick = () => {
//       this.#handleCancel(data)
//       this.#confirmModal.style.setProperty('opacity', '0')
//       this.#confirmModal.style.setProperty(
//         'pointer-events',
//         'none',
//       )
//     }
//   }
