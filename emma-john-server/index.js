const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.bbk7z.mongodb.net:27017,cluster0-shard-00-01.bbk7z.mongodb.net:27017,cluster0-shard-00-02.bbk7z.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-1227kd-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const productCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_PRODUCT);
    const orderCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_ORDER);
    // Delete all documents form the collection
    //productCollection.deleteMany({}).then(res=>{console.log('deleted')})  // Delete all

    app.post('/addProduct', (req, res) => {// insert Many item
        const product = req.body;
        //console.log(product);
        productCollection.insertMany(product)
            .then(result => {
                res.send(result.insertedCount);
            })
    });

    app.get('/products', (req, res) => { // get all product
        console.log(req.query.search)
        productCollection.find({ name: { $regex: req.query.search } })
            .toArray((err, documents) => {
                res.status(200).send(documents);
            })
    });

    app.get('/products/:key', (req, res) => { // get one product
        productCollection.find({ key: req.params.key })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    });

    app.post('/getProductsByKeys', (req, res) => { // Get some products
        const productKeys = req.body;
        productCollection.find({ key: { $in: productKeys } })
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

    app.post('/addOrder', (req, res) => {// insert one item
        const order = req.body;
        orderCollection.insertOne(order)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    });
});

app.listen(5000);