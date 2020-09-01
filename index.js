const express = require('express');
const mysql = require('mysql');
const { getResults } = require('./routes/results');

const app = express();

// Set the port either server defined or 4000
const PORT = process.env.PORT || 4000;

// Create mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'swisshockeyfan'
})

db.connect(err => {
    if(err) return err;

    console.log('Connected to database..');
});

global.db = db;

app.use(express.json());

app.get('/getResults/:date', getResults)

app.post('/addResults/:id?', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})