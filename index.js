const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const dbConnect = require('./dbConnection')
const port = 4000
app.use(cors({
    origin: port
}));

dbConnect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let tasks = [
    { id: '1', name: 'first card', description: 'some desc', status: 'todo', priority: 3 },
    { id: '2', name: 'second card', description: 'some desc', status: 'progress', priority: 1 },
    { id: '3', name: 'third card', description: 'some desc', status: 'review', priority: 1 },
    { id: '4', name: 'forth card', description: 'some desc', status: 'done', priority: 2 },
]

let statuses = [
    {
        id: '1',
        title: 'todo',
        status: 'todo',
    },
    {
        id: '2',
        title: 'progress',
        status: 'progress',
    },
    {
        id: '3',
        title: 'review',
        status: 'review',
    },
    {
        id: '4',
        title: 'done',
        status: 'done',
    },
]

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/tasks', (req, res) => {
    res.send(tasks);
})

app.get(`/tasks/:taskId`, (req, res) => {
    const taskId = req.params.taskId;
    const task = tasks.find(el => el.id === taskId);
    res.send(task);
})

app.delete(`/tasks/:taskId`, (req, res) => {
    const taskId = req.params.taskId;
    tasks = tasks.filter(el => el.id !== taskId);
    res.send(tasks);
})

app.post('/tasks', (req, res) => {
    const card = req.body;
    tasks.push({
        id: Math.random().toString(),
        ...card
    })
    res.send('Task has been created')
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
app.patch('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    tasks = tasks.map(el => el.id === taskId ? ({...updatedTask, id: el.id }) : el);
    res.status(200).send(tasks);
})

app.get('/statuses', (req, res) => {
    res.send(statuses);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
