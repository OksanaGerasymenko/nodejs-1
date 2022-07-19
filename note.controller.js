import fs from 'fs/promises'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const notesPath = path.join(__dirname, 'db.json')

export async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen(`${title} note has been added`))
}

export async function getNotes() {
    const data = await fs.readFile(notesPath, {encoding: 'utf-8'})
    const notes = JSON.parse(data)
    return Array.isArray(notes) ? notes : []
}

export async function printNotes() {    
    const notes = await getNotes()
    console.log(chalk.bgBlue('Notes list:'))
    let i=1;
    notes.forEach((note) => {
        console.log(chalk.blue(`${i}. ${note.id}  ${note.title}`))
        i++
    })
}

export async function removeNoteById(noteId) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteId)
    if (index > -1) {
        notes.splice(index, 1)
        await fs.writeFile(notesPath, JSON.stringify(notes))
        console.log(chalk.bgGreen(`note with id ${noteId} has been removed`))
    } else console.log(chalk.bgRed(`note with id ${noteId} not founded`))
}

export async function editNoteById(noteId, note) {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteId)
    if (index > -1) {
        notes[index]= {...notes[index], ...note}
        await fs.writeFile(notesPath, JSON.stringify(notes))
    }
}