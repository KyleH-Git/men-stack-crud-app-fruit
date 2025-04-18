const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
});

const fruit = mongoose.model('Fruit', fruitSchema);

module.exports = fruit;