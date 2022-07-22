const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit()
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.rzolu02.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
    .then(() =>
        Note.find({ important: true }).then(result => {
            result.forEach(note => {
                console.log(note)
            })
            mongoose.connection.close()
        })
    )


// mongoose.connect(url)
//     .then((result) => {
//         console.log('Connected')
//         const note = new Note({
//             content: "GET and POST are the most important methods of HTTP protocol",
//             date: new Date(),
//             important: true
//         })
//         return note.save()
//     })
//     .then(() => {
//         console.log('Note Saved')
//         return mongoose.connection.close()
//     })
//     .catch((err) => {
//         console.log(err)
//     })
