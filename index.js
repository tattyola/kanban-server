const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const dbConnect = require('./dbConnection')
const { v4: uuidv4 } = require('uuid');
const port = 4000
app.use(cors({
    origin: port
}));

dbConnect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let tasks = [
    { id: uuidv4(), name: 'first card', description: 'some desc', status: 'todo', priority: 3 },
    { id: uuidv4(), name: 'second card', description: 'some desc', status: 'progress', priority: 1 },
    { id: uuidv4(), name: 'third card', description: 'some desc', status: 'review', priority: 1 },
    { id: uuidv4(), name: 'forth card', description: 'some desc', status: 'done', priority: 2 },
]

let statuses = [
    {
        id: uuidv4(),
        title: 'todo',
        status: 'todo',
    },
    {
        id: uuidv4(),
        title: 'progress',
        status: 'progress',
    },
    {
        id: uuidv4(),
        title: 'review',
        status: 'review',
    },
    {
        id: uuidv4(),
        title: 'done',
        status: 'done',
    },
]

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.get('/tasks', (req, res) => {
    res.status(200).send(tasks);
})

app.get(`/tasks/:taskId`, (req, res) => {
    const taskId = req.params.taskId;
    const task = tasks.find(el => el.id === taskId);
    res.status(200).send(task);
})

app.delete(`/tasks/:taskId`, (req, res) => {
    const taskId = req.params.taskId;
    tasks = tasks.filter(el => el.id !== taskId);
    res.status(200).send(tasks);
})

app.post('/tasks', (req, res) => {
    const card = req.body;
    tasks.push({
        id: Math.random().toString(),
        ...card
    })
    res.status(200).send('Task has been created')
})

app.patch('/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const updatedProperties = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send({ message: 'Task not found' });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedProperties, id: taskId };
    res.status(200).send(tasks[taskIndex]);
});

app.get('/statuses', (req, res) => {
    res.status(200).send(statuses);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
