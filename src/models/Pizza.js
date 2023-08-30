const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  size: String,
  flavor: String,
  price: Number,
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
