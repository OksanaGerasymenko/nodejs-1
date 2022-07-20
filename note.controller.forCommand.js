const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen(`${title} note has been added`))
}

async function getNotes() {
    const data = await fs.readFile(notesPath, {encoding: 'utf-8'})
    const notes = JSON.parse(data)
    return Array.isArray(notes) ? notes : []
}

async function printNotes() {    
    const notes = await getNotes()
    console.log(chalk.bgBlue('Notes list:'))
    let i=1;
    notes.forEach((note) => {
        console.log(chalk.blue(`${i}. ${note.id}  ${note.title}`))
        i++
    })
}

async function removeNoteById(noteId) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteId)
    if (index > -1) {
        notes.splice(index, 1)
        await fs.writeFile(notesPath, JSON.stringify(notes))
        console.log(chalk.bgGreen(`note with id ${noteId} has been removed`))
    } else console.log(chalk.bgRed(`note with id ${noteId} not founded`))
}

async function editNoteById(noteId, title) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteId)
    if (index > -1) {
        notes[index].title = title
        await fs.writeFile(notesPath, JSON.stringify(notes))
    }
}
module.exports = {
    addNote,
    getNotes,
    printNotes,
    removeNoteById,
    editNoteById
}