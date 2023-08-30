// Modelagem de Dados e Factory Method
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
