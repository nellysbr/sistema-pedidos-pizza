// PizzaController.js

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

  async getAllPizzas() {
    try {
      const pizzas = await this.Pizza.find();
      return pizzas;
    } catch (error) {
      console.error('Error fetching pizzas:', error);
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

  async updatePizza(pizzaId, updatedData) {
    try {
      const updatedPizza = await this.Pizza.findByIdAndUpdate(pizzaId, updatedData, { new: true });
      return updatedPizza;
    } catch (error) {
      console.error('Error updating pizza:', error);
      throw error;
    }
  }

  async deletePizza(pizzaId) {
    try {
      const deletedPizza = await this.Pizza.findByIdAndDelete(pizzaId);
      return deletedPizza;
    } catch (error) {
      console.error('Error deleting pizza:', error);
      throw error;
    }
  }
}

module.exports = new PizzaController();
