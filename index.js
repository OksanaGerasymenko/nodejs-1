import express from 'express'
import chalk from 'chalk'
import path from 'path'
import { addNote, getNotes, removeNoteById, editNoteById } from './note.controller.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = 3000

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', async(req, res) => {
    res.render('index', {
        created: false,
        title: 'Notes app',
        notes: await getNotes()
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        created: true,
        title: 'Notes app',
        notes: await getNotes()        
    })
})

app.delete('/:id', async (req, res) => {
    const id = req.params.id
    await removeNoteById(id)
    res.render('index', {
        created: false,
        title: 'Notes app',
        notes: await getNotes()
    })
})

app.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log(id, body)
    await editNoteById(id, req.body)
    res.render('index', {
        created: false,
        title: 'Notes app',
        notes: await getNotes()
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})
