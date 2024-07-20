// Environment.js
class Environment {
    constructor() {
        this.state = {};
        this.observers = [];
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyObservers();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.perceive(this.state));
    }
}

module.exports = Environment;
