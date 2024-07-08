const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }))

const PORT=80;
const mongodbURL='mongodb+srv://jayeshlodha177:jayesh@cluster0.csj3w03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongodbURL);

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        address: String,
        email: String,
        feedback: String
      });

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));


// ENDPOINTS
app.get('/', (req, res) => {
        const params = {}
        res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
        const params = {}
        console.log("Contact page")
        res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
        var myData = new Contact(req.body);
        myData.save().then(()=>{
        res.send('This item has been saved to the database')
        }).catch(()=>{
        res.status(200).send('item was not saved to the databse')
    });
})
//  Start the server
app.listen(PORT, () => {
        console.log(`The application started successfully on port ${PORT}`);
});
