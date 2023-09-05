const modelFactory = require('../models/ModelFactory');
const OrderObserver = require('../observers/OrderObserver');

class OrderFacade {
  constructor(orderObserver) {
    this.Order = modelFactory.getModel('Order');
    this.Customer = modelFactory.getModel('Customer');
    this.Pizza = modelFactory.getModel('Pizza');
    this.orderObserver = orderObserver;
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

      // Notify the order observer
      this.orderObserver.notify(order);

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async updateOrder(orderId, updatedData) {
    try {
      const updatedOrder = await this.Order.findByIdAndUpdate(orderId, updatedData, { new: true });

      // Notify the order observer
      this.orderObserver.notify(updatedOrder);

      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async deleteOrder(orderId) {
    try {
      const deletedOrder = await this.Order.findByIdAndDelete(orderId);

      // Notify the order observer
      this.orderObserver.notify(deletedOrder, 'deleted');

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

  notify(order) {
    this.orderObserver.notify(order);
  }
}

module.exports = OrderFacade;
