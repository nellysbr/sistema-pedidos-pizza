class ModelFactory {
    constructor() {
      this.models = {};
    }
  
    registerModel(name, model) {
      this.models[name] = model;
    }
  
    getModel(name) {
      return this.models[name];
    }
  }
  
  const modelFactory = new ModelFactory();
  
  // Registrando os modelos
  modelFactory.registerModel('Order', require('./Order'));
  modelFactory.registerModel('Customer', require('./Customer'));
  modelFactory.registerModel('Pizza', require('./Pizza'));
  
  module.exports = modelFactory;
  