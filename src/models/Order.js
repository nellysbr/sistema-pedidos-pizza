// Modelagem de Dados e Factory Method

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }],
  status: { type: String, enum: ['waiting', 'in-progress', 'completed'], default: 'waiting' },
  // Outras propriedades do pedido
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
