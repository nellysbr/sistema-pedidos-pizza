// CustomerController.js

const modelFactory = require('../models/ModelFactory');
const OrderObserver = require('../observers/OrderObserver'); // Import the OrderObserver

class CustomerController {
  constructor() {
    this.Customer = modelFactory.getModel('Customer');
    this.Order = modelFactory.getModel('Order');
    this.orderObserver = new OrderObserver(); // Create an instance of OrderObserver
    this.orderObserver.subscribe(this); // Subscribe to the OrderObserver
  }

  async createCustomer(customerData) {
    try {
      const customer = await this.Customer.create(customerData);
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.Customer.find();
      return customers;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async getCustomerById(customerId) {
    try {
      const customer = await this.Customer.findById(customerId);
      return customer;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async updateCustomer(customerId, updatedData) {
    try {
      const updatedCustomer = await this.Customer.findByIdAndUpdate(customerId, updatedData, { new: true });
      return updatedCustomer;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  async deleteCustomer(customerId) {
    try {
      const deletedCustomer = await this.Customer.findByIdAndDelete(customerId);
      return deletedCustomer;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }

  async getCustomerOrders(customerId) {
    try {
      const orders = await this.Order.find({ customer: customerId });
      return orders;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
  }

  // Observer method to be notified of order changes
  update(order, action) {
    const { customer } = order;
    console.log(`Customer ${customer} has been ${action} an order.`);
  }

  // ... Other methods related to customers
}

module.exports = new CustomerController();