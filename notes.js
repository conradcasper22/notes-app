const fs = require('fs')
const chalk = require('chalk')
const log = console.log




const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( note => note.title === title )
    

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        log(chalk.green.inverse('New note added!'))
    } else {
        log(chalk.red.inverse("Note title taken!"))
    }
}

const removeNote = (title) => {
    const oldNotes = loadNotes()


    const newNotes = oldNotes.filter( note => note.title !== title )

    if(oldNotes.length === newNotes.length){
        log(chalk.red("No note found!"))
    } else {
        saveNotes(newNotes)
        log(chalk.green('Removed note!'))
    }
}
    
const listNotes = () => {
    const notes = loadNotes()

    log(chalk.blue.inverse("Your notes"))
    notes.forEach( note => {
        log(note.title)
    } )
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find( note => note.title === title )

    if(note){
        log(chalk.blue.bold.inverse(note.title))
        log(note.body)
    } else {
        log(chalk.red.bold('No note found!'))
    }

}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }



    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
}





module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}