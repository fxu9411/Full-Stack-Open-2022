const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log("Connecting to", url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = mongoose.model('PhoneBook', phoneBookSchema)