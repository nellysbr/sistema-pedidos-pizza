// pizzaRoutes.js

const express = require('express');
const PizzaController = require('../controllers/PizzaController');

function PizzaRoutes() {
  const router = express.Router();

  // Create a new pizza
  router.post('/pizzas', async (req, res) => {
    const pizzaData = req.body;

    try {
      const pizza = await PizzaController.createPizza(pizzaData);
      res.status(201).json(pizza);
    } catch (error) {
      console.error('Error creating pizza:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all pizzas
  router.get('/pizzas', async (req, res) => {
    try {
      const pizzas = await PizzaController.getAllPizzas();
      res.json(pizzas);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get a specific pizza by ID
  router.get('/pizzas/:pizzaId', async (req, res) => {
    const pizzaId = req.params.pizzaId;
    try {
      const pizza = await PizzaController.getPizzaById(pizzaId);
      if (!pizza) {
        return res.status(404).json({ message: 'Pizza not found' });
      }
      res.json(pizza);
    } catch (error) {
      console.error('Error fetching pizza:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update a pizza by ID
  router.put('/pizzas/:pizzaId', async (req, res) => {
    const pizzaId = req.params.pizzaId;
    const updatedData = req.body;

    try {
      const updatedPizza = await PizzaController.updatePizza(pizzaId, updatedData);
      if (!updatedPizza) {
        return res.status(404).json({ message: 'Pizza not found' });
      }
      res.json(updatedPizza);
    } catch (error) {
      console.error('Error updating pizza:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete a pizza by ID
  router.delete('/pizzas/:pizzaId', async (req, res) => {
    const pizzaId = req.params.pizzaId;
    try {
      const deletedPizza = await PizzaController.deletePizza(pizzaId);
      if (!deletedPizza) {
        return res.status(404).json({ message: 'Pizza not found' });
      }
      res.json({ message: 'Pizza deleted successfully' });
    } catch (error) {
      console.error('Error deleting pizza:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}

module.exports = PizzaRoutes;
