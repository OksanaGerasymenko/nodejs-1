document.addEventListener('click', event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() =>{
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id
        const title = event.target.closest('div').previousElementSibling.innerText
        const li = event.target.closest('li')
        const liInnerHTML = li.innerHTML

        const input = document.createElement('input')        
        input.setAttribute('type', 'text')
        input.setAttribute('value', title)

        const btnSave = document.createElement('button')
        btnSave.className = 'btn btn-primary'
        btnSave.innerText = 'Сохранить'
        btnSave.addEventListener('click', () => {
            const newTitle = input.value
            if (newTitle) {
                edit(id, {title:newTitle}).then(() =>{
                    li.innerHTML = liInnerHTML
                    li.firstElementChild.innerHTML = `${newTitle}`
                })
            }
        })

        const btnCancel = document.createElement('button')
        btnCancel.className = 'btn btn-danger'
        btnCancel.innerText = 'Отменить'
        btnCancel.addEventListener('click', () =>{
            li.innerHTML = liInnerHTML
        })

        const btnContainer = document.createElement('div')
        btnContainer.append(btnSave, btnCancel)
        li.innerHTML = ''
        li.append(input, btnContainer)
        
        
        
    }
})

async function remove(id) {
   await fetch(`/${id}`, {method: 'DELETE'})
}
async function edit(id,note) {
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    })
}