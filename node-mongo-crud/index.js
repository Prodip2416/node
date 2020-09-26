const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const password = 'fTY5sXUsxlELvGRC';
const dbName = 'organicdb';

const uri = `mongodb://mydbuser:fTY5sXUsxlELvGRC@cluster0-shard-00-00.bbk7z.mongodb.net:27017,cluster0-shard-00-01.bbk7z.mongodb.net:27017,cluster0-shard-00-02.bbk7z.mongodb.net:27017/organicdb?ssl=true&replicaSet=atlas-1227kd-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json()); // for html body data acess
app.use(bodyParser.urlencoded({ extended: true })); // for form data access

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) console.log('Err::', err);
    const collection = client.db(dbName).collection('products');

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        collection.insertOne(product)
            .then(result => {
                console.log('Inserted Successfully');
                res.send('Successfully added');
            })
    })

    // client.close();
});


app.listen(3000);