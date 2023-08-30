const modelFactory = require('../models/ModelFactory');

class OrderFacade {
  constructor() {
    this.Order = modelFactory.getModel('Order');
    this.Customer = modelFactory.getModel('Customer');
    this.Pizza = modelFactory.getModel('Pizza');
  }

  async createOrder(orderData) {
    const { customer: customerId, pizzas: pizzaData } = orderData;

    try {
      // Fetch the customer
      const customer = await this.Customer.findById(customerId);

      if (!customer) {
        throw new Error('Customer not found');
      }

      // Create the pizzas
      const pizzas = await Promise.all(pizzaData.map(pizza => this.Pizza.create(pizza)));

      // Calculate the total price of all pizzas
      const totalPrice = pizzas.reduce((total, pizza) => total + pizza.price, 0);

      // Create the order
      const order = await this.Order.create({ customer, pizzas, totalPrice });

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async updateOrder(orderId, updatedData) {
    try {
      const updatedOrder = await this.Order.findByIdAndUpdate(orderId, updatedData, { new: true });
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const deletedOrder = await this.Order.findByIdAndDelete(orderId);
      return deletedOrder;
    } catch (error) {
      console.error('Error deleting order:', error);
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

  async getPizzaById(pizzaId) {
    try {
      const pizza = await this.Pizza.findById(pizzaId);
      return pizza;
    } catch (error) {
      console.error('Error fetching pizza:', error);
      throw error;
    }
  }

  async getCustomerOrders(customerId) {
    try {
      const orders = await this.Order.find({ customer: customerId });
  
      const ordersWithDetails = await Promise.all(
        orders.map(async order => {
          const orderData = order.toObject();
  
          const detailedPizzas = await Promise.all(
            order.pizzas.map(async pizzaId => {
              const pizza = await this.Pizza.findById(pizzaId);
              return pizza.toObject();
            })
          );
  
          orderData.pizzas = detailedPizzas;
          return orderData;
        })
      );
  
      return ordersWithDetails;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
  }
}

module.exports = OrderFacade;
