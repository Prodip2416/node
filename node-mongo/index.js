const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json())



const users = ['asad', 'amin', 'alamin', 'nuru', 'shahded', 'lira'];

app.get('/', (req, res) => {
    res.send('hello from node...!!!');
})

app.get('/fruits', (req, res) => {
    res.send({ fruits: 'Banana', Quantity: 100, price: 1000 });
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const name = users[id];
    res.send({ id, name });
})

// post req  
app.post('/addUser', (req, res) => {
    const user = req.body;
    res.send(user);
    //console.log(req.body)
});

app.listen(3000, () => console.log('app is running'));