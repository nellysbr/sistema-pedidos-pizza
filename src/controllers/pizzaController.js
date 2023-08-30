const modelFactory = require('../models/ModelFactory');

class PizzaController {
  constructor() {
    this.Pizza = modelFactory.getModel('Pizza');
  }

  async createPizza(pizzaData) {
    try {
      const pizza = await this.Pizza.create(pizzaData);
      return pizza;
    } catch (error) {
      console.error('Error creating pizza:', error);
      throw error;
    }
  }

  // Other methods related to pizzas
}

module.exports = new PizzaController();
