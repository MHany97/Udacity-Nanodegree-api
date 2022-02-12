// Setup empty JS Array to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, () => {
    console.log(`running on port ${port}`);
});

// GET Request

app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData)
})

//POST Reqeust
app.post('/add', (req, res) => {

    newEntry = {
        date: req.body.date,
        Temp: req.body.Temp,
        Feel: req.body.Feel,
    }

    projectData.push(newEntry);
    res.send(projectData);
    console.log(projectData)

})