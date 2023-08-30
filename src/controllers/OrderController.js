const modelFactory = require('../models/ModelFactory');
const OrderObserver = require('../observers/OrderObserver'); // Import the OrderObserver

class OrderController {
  constructor() {
    this.Order = modelFactory.getModel('Order');
    this.orderObserver = new OrderObserver(); // Create an instance of OrderObserver
  }

  async createOrder(orderData) {
    try {
      const order = await this.Order.create(orderData);
      this.orderObserver.notify(order, 'created'); // Notify observers when an order is created
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.Order.find();
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await this.Order.findById(orderId);
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  async updateOrder(orderId, updatedData) {
    try {
      const updatedOrder = await this.Order.findByIdAndUpdate(orderId, updatedData, { new: true });
      this.orderObserver.notify(updatedOrder, 'updated'); // Notify observers when an order is updated
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const deletedOrder = await this.Order.findByIdAndDelete(orderId);
      this.orderObserver.notify(deletedOrder, 'deleted'); // Notify observers when an order is deleted
      return deletedOrder;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }

  // ... Other methods related to orders
}

module.exports = new OrderController();
