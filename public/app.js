document.addEventListener('click', event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() =>{
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id
        const title = event.target.closest('div').previousElementSibling.innerText
        const newTitle = prompt('Enter new title', title)
        if (newTitle) {
            edit(id, {title:newTitle}).then(()=>{
                event.target.closest('div').previousElementSibling.innerText = newTitle
            })
        }
    }
})

async function remove(id) {
   await fetch(`/${id}`, {method: 'DELETE'})
}
async function edit(id,note) {
    console.log(id, note)
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    })
}