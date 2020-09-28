const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const port = 5000;
const dbName = 'burjAlArab';

const uri = `mongodb://mydbuser:fTY5sXUsxlELvGRC@cluster0-shard-00-00.bbk7z.mongodb.net:27017,cluster0-shard-00-01.bbk7z.mongodb.net:27017,cluster0-shard-00-02.bbk7z.mongodb.net:27017/burjAlArab?ssl=true&replicaSet=atlas-1227kd-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

client.connect((err) => {
    if (err) console.log('Error : ' + err);
    const bookingCollection = client.db(dbName).collection('bookings');

    app.post('/addBooking', (req, res) => {
        const booking = req.body;

        bookingCollection.insertOne(booking)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    });

    app.get('/getBookingInfo', (req, res) => {
        console.log(req.headers.authorization);
        bookingCollection.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents);
            })
    });

});

app.listen(port);