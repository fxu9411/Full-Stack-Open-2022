// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     process.exit()
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const phoneNumber = process.argv[4]

// const url = `mongodb+srv://fullstack:${password}@cluster0.rzolu02.mongodb.net/phoneBook?retryWrites=true&w=majority`

// const phoneBookSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })

// const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

// if (process.argv.length < 5) {
//     mongoose
//         .connect(url)
//         .then(console.log("phonebook:"))
//         .then(() =>
//             PhoneBook.find().then(result => {
//                 result.forEach(entry => {
//                     console.log(`${entry.name} ${entry.number}`)
//                 })
//                 mongoose.connection.close()
//             })
//         )
// } else {
//     mongoose.connect(url)
//         .then((result) => {
//             console.log('Connected')
//             const entry = new PhoneBook({
//                 name: name,
//                 number: phoneNumber
//             })
//             return entry.save()
//         })
//         .then(() => {
//             console.log(`Added ${name} number: ${phoneNumber} to phonebook`)
//             return mongoose.connection.close()
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }