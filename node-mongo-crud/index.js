const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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

    // Get all Product
    app.get('/products', (req, res) => {
        collection.find({}) //.limit(2)
            .toArray((err, result) => {
                res.send(result);
            });
    });

    // get a single item
    app.get('/product/:id', (req, res) => {
        collection.find({ _id: ObjectID(req.params.id) }) //.limit(2)
            .toArray((err, result) => {
                res.send(result[0]);
            });
    });

    // Add Product to database
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        collection.insertOne(product)
            .then(result => {
                // console.log('Inserted Successfully');
                // res.send('item added successfully');
                res.redirect('/');
            })
    })

    // Delete a product
    app.delete('/delete/:id', (req, res) => {
        collection.deleteOne({ _id: ObjectID(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0);
            })
    })

    // Update single item
    app.patch('/update/:id', (req, res) => {
        collection.updateOne({ _id: ObjectID(req.params.id) },
            {
                $set: { price: req.body.price, quantity: req.body.quantity }
            })
            .then(result => {
                res.send(result.modifiedCount > 0);
            })
    });

    // client.close();
});


app.listen(3000);