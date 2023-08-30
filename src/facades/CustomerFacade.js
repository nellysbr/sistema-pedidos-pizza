// CustomerFacade.js

const modelFactory = require('../models/ModelFactory');

class CustomerFacade {
  constructor() {
    this.Customer = modelFactory.getModel('Customer');
    this.Order = modelFactory.getModel('Order');
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

  async getCustomerOrders(customerId) {
    try {
      const orders = await this.Order.find({ customer: customerId });
      return orders;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
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

  // Other methods related to customers

}

module.exports = CustomerFacade;
