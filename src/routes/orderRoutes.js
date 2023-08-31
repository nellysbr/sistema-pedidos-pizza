const express = require('express');
const OrderFacade = require('../facades/OrderFacade'); // Import the OrderFacade

function OrderRoutes() {
  const router = express.Router();
  const orderFacade = new OrderFacade(); // Create an instance of OrderFacade

  // Create a new order
  router.post('/orders', async (req, res) => {
    const orderData = req.body;
  
    // Validate order data here before creating the order
    const { customer: customerId, pizzas: pizzaData } = orderData;
  
    // Ensure customerId is provided and is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
  
    // Ensure pizzaData is an array
    if (!Array.isArray(pizzaData)) {
      return res.status(400).json({ error: 'Invalid pizza data' });
    }
  
    // Ensure pizzaData contains valid pizza objects
    const validPizzaKeys = ["size", "flavor", "price"];
    for (const pizza of pizzaData) {
      const pizzaKeys = Object.keys(pizza);
      if (!validPizzaKeys.every(key => pizzaKeys.includes(key))) {
        return res.status(400).json({ error: 'Invalid pizza data' });
      }
    }
  
    try {
      const order = await orderFacade.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all orders
  router.get('/orders', async (req, res) => {
    try {
      const orders = await orderFacade.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get a specific order by ID
  router.get('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const order = await orderFacade.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update an order by ID
  router.put('/orders/:orderId/status', async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body;
  
    // Define valid status values
    const validStatusValues = ["waiting", "in-progress", "completed"];
  
    // Check if the provided status value is valid
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
  
    try {
      const updatedOrder = await orderFacade.updateOrder(orderId, { status });
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete an order by ID
  router.delete('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const deletedOrder = await orderFacade.deleteOrder(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}

module.exports = OrderRoutes;
