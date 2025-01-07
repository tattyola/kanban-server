const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dbConnect = require('./dbConnection')
const port = 4000

dbConnect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let cards = [
    { id: '1', name: 'first card', status: 'todo', priority: 3 },
    { id: '2', name: 'second card', status: 'progress', priority: 1 },
    { id: '3', name: 'third card', status: 'review', priority: 1 },
    { id: '4', name: 'forth card', status: 'done', priority: 2 },
]
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/card', (req, res) => {
    res.send(cards);
})

app.delete(`/card/:cardId`, (req, res) => {
    const cardId = req.params.cardId;
    cards = cards.filter(el => el.id !== cardId);
    res.send(cards);
})

app.post('/card', (req, res) => {
    const card = req.body;
    cards.push({
        id: Math.random().toString(),
        ...card
    })
    res.send('Card has been created')
})

// update status
// app.patch('/card/:cardId', (req, res) => {
//     const cardId = req.params.cardId;
//     const updatedStatus = req.body.status;
//     const cardToUpd = cards.find(el => el.id === cardId);
//     if(cardToUpd) {
//         cardToUpd.status = updatedStatus;
//         res.send('Card has been updated')
//     } else {
//         res.status(404).send('not found')
//     }
// })

// update card
app.patch('/card/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    const updatedCard = req.body;
    cards = cards.map(el => el.id === cardId ? ({...updatedCard, id: el.id }) : el);
    res.send('Card has been updated');
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
