require('dotenv').config()
const mongoose = require('mongoose')

function dbConnect() {
    mongoose.connect(process.env.URL, { useNewUrlParser: true })
        .then(() => console.log('Mongo DB Connected!'))
        .catch(err => console.log(err))
}
mongoose.set('strictQuery', false)
module.exports = dbConnect
