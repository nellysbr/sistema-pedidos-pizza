class OrderObserver {
  constructor() {
    this.observers = [];
    this.logNotifications = true;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  update(order, action) {
    console.log(`Order ${order._id} has been ${action}.`);
  }
  notify(order) {
    if (this.logNotifications) {
      console.log(`Order ${order._id} has been updated.`);
    }
    this.observers.forEach(observer => observer.update(order));
  }
}

module.exports = OrderObserver;