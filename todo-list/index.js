const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbName = 'todoList';
const uri = `mongodb://mydbuser:fTY5sXUsxlELvGRC@cluster0-shard-00-00.bbk7z.mongodb.net:27017,cluster0-shard-00-01.bbk7z.mongodb.net:27017,cluster0-shard-00-02.bbk7z.mongodb.net:27017/todoList?ssl=true&replicaSet=atlas-1227kd-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

client.connect((err) => {
    if (err) console.log('Error : ' + err);

    const todoCollection = client.db(dbName).collection('lists');

    app.get('/todo', (req, res) => {
        todoCollection.find({})
            .toArray((err, result) => {
                res.send(result);
            })
    })

    app.get('/loadTodo/:id', (req, res) => {
        todoCollection.find({ _id: ObjectID(req.params.id) })
            .toArray((err, result) => {
                res.send(result[0]);
            })
    });

    app.post('/addTodo', (req, res) => {
        const todo = req.body;
        todoCollection.insertOne(todo)
            .then(result => {
                res.redirect('/');
            })
    })

    app.patch('/update/:id', (req, res) => {
        todoCollection.updateOne({ _id: ObjectID(req.params.id) },
            {
                $set: { todo: req.body.todo }
            })
            .then(result => {
                res.send(result.modifiedCount > 0);
            })
    });

    app.delete('/delete/:id', (req, res) => {
        todoCollection.deleteOne({ _id: ObjectID(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0);
            })
    })
});

app.listen(3000);