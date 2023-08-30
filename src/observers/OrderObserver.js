class OrderObserver {
    constructor() {
      this.observers = [];
    }
  
    subscribe(observer) {
      this.observers.push(observer);
    }
  
    unsubscribe(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(order) {
      this.observers.forEach(observer => observer.update(order));
    }
  }
  
  module.exports = OrderObserver;
  