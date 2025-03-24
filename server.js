const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

//Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

//log connection status to terminal on start
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//Import the Fruit model
const Fruit = require('./models/fruit.js');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));



// GET /
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// GET /fruits
app.get('/fruits', async (req, res) => {
    const allFruits = await Fruit.find();
    res.render('fruits/index.ejs', {fruits: allFruits});
});

// GET /fruits/new
app.get('/fruits/new', async (req, res) => {
    res.render('fruits/new.ejs');
});

// GET /fruits/:fruidId
app.get('/fruits/:fruitId', async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render('fruits/show.ejs', {fruit: foundFruit});
});

// POST /fruits
app.post('/fruits', async (req, res) => {
    if(req.body.isReadyToEat === 'on') {
        req.body.isReadyToEat = true;
    }else{
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect('/fruits');
});

// DELETE /fruits/:fruitId
app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect('/fruits');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000...');
});