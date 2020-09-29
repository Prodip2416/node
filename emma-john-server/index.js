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
    const productCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        productCollection.insertMany(product)
            .then(result => {
                console.log(result.insertedCount);
            })
    });
});

app.listen(5000);