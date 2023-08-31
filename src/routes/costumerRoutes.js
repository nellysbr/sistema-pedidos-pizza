const express = require('express');
const CustomerFacade = require('../facades/CustomerFacade'); // Import the CustomerFacade
const OrderFacade = require('../facades/OrderFacade');

function CustomerRoutes() {
  const router = express.Router();
  const customerFacade = new CustomerFacade(); // Create an instance of CustomerFacade
  const orderFacade = new OrderFacade();

  // Create a new customer
  router.post('/customers', async (req, res) => {
    const customerData = req.body;
  
    // Validate customer data here before creating the customer
    const { name, address, phone } = customerData;
  
    // Check if required fields are provided
    if (!name || !address || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Add more validation rules as needed
  
    try {
      const customer = await customerFacade.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all customers
  router.get('/customers', async (req, res) => {
    try {
      const customers = await customerFacade.getAllCustomers();
      const customersWithOrders = await Promise.all(customers.map(async customer => {
        const customerData = customer.toObject();
        const customerOrders = await customerFacade.getCustomerOrders(customerData._id);
  
        // Fetch detailed pizza information for each order
        const ordersWithPizzas = await Promise.all(customerOrders.map(async order => {
          const orderData = order.toObject();
          const detailedPizzas = await Promise.all(order.pizzas.map(async pizzaId => {
            const pizza = await orderFacade.getPizzaById(pizzaId); // <-- Erro aqui
            return pizza.toObject();
          }));
          orderData.pizzas = detailedPizzas;
          return orderData;
        }));
  
        customerData.orders = ordersWithPizzas;
        return customerData;
      }));
      res.json(customersWithOrders);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get a specific customer by ID
  router.get('/customers/:customerId', async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const customer = await customerFacade.getCustomerById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/customers/:customerId/orders', async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const customerOrders = await customerFacade.getCustomerOrders(customerId);
      res.json(customerOrders);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update a customer by ID
  router.put('/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const updatedData = req.body;
  
    // Validate updated data here before updating the customer
    const { name, address, phone } = updatedData;
  
    // Check if at least one field is provided for update
    if (!name && !address && !phone) {
      return res.status(400).json({ error: 'No valid update data provided' });
    }
  
    // Add more validation rules as needed
  
    try {
      const updatedCustomer = await customerFacade.updateCustomer(customerId, updatedData);
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(updatedCustomer);
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete a customer by ID
  router.delete('/customers/:customerId', async (req, res) => {
    try {
      const customerId = req.params.customerId;
      const deletedCustomer = await customerFacade.deleteCustomer(customerId);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}

module.exports = CustomerRoutes;
