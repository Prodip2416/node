const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const admin = require('firebase-admin');
require('dotenv').config();

const port = 5000;

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.bbk7z.mongodb.net:27017,cluster0-shard-00-01.bbk7z.mongodb.net:27017,cluster0-shard-00-02.bbk7z.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-1227kd-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());


const serviceAccount = require("./configs/burj-al-arab-c9ab4-firebase-adminsdk-4w824-de11077bb4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

client.connect((err) => {
    if (err) console.log('Error : ' + err);
    const bookingCollection = client.db(process.env.DB_NAME).collection('bookings');

    app.post('/addBooking', (req, res) => {
        const booking = req.body;

        bookingCollection.insertOne(booking)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    });

    app.get('/getBookingInfo', (req, res) => {
        const bearer = req.headers.authorization;
        if (bearer && bearer.startsWith('Bearer ')) {
            const token = bearer.split(' ')[1];
            admin.auth().verifyIdToken(token)
                .then(function (decodedToken) {
                    const tokenEmail = decodedToken.email;
                    if (tokenEmail == req.query.email) {
                        bookingCollection.find({ email: req.query.email })
                            .toArray((err, documents) => {
                                res.send(documents);
                            })
                    } else {
                        res.status(401).send('Un-authorize access');
                    }
                }).catch(function (error) {
                    // Handle error
                });
        } else {
            res.status(401).send('Un-authorize access');
        }
    });

});

app.listen(port);