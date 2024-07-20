# JS Agentic Framework Documentation

## Overview

The Agentic Framework is designed to simulate an environment and agents within that environment. Agents can perceive changes in the environment, set goals, plan actions, execute them, and learn from their experiences. The framework comprises two main classes: `Agent` and `Environment`.

## Classes

### Agent

The `Agent` class represents an agent that can perceive its environment, set goals, plan actions, and learn from the outcomes of those actions.

#### Properties

- **name**: The name of the agent.
- **environment**: The environment in which the agent operates.
- **knowledge**: An object storing the knowledge acquired by the agent.
- **goals**: An array of goals that the agent aims to achieve.

#### Methods

- **constructor(name, environment)**
  - Initializes the agent with a name and an environment.
  - Registers the agent as an observer of the environment.

- **setGoal(goal)**
  - Adds a goal to the agent's list of goals.

- **perceive(environmentState)**
  - Called when the environment changes.
  - Triggers the agent's planning process.

- **plan()**
  - Initiates the planning phase where the agent decides on an action based on its goals.

- **decideAction()**
  - Contains simple decision-making logic to determine the next action.

- **execute(action)**
  - Executes the decided action.
  - Simulates the action execution and triggers the learning process.

- **learn(action)**
  - Updates the agent's knowledge based on the action's outcome.

### Environment

The `Environment` class represents the environment in which agents operate. It maintains the state of the environment and notifies agents of any changes.

#### Properties

- **state**: An object storing the current state of the environment.
- **observers**: An array of observers (agents) that are notified of state changes.

#### Methods

- **updateState(newState)**
  - Merges the new state with the current state.
  - Notifies all registered observers of the state change.

- **addObserver(observer)**
  - Adds an observer (agent) to the list of observers.

- **notifyObservers()**
  - Notifies all registered observers of the current state.

## Usage Example

```javascript
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

// Agent.js
class Agent {
    constructor(name, environment) {
        this.name = name;
        this.environment = environment;
        this.knowledge = {};
        this.goals = [];
        this.environment.addObserver(this);
    }

    setGoal(goal) {
        this.goals.push(goal);
    }

    perceive(environmentState) {
        console.log(`${this.name} perceived:`, JSON.stringify(environmentState));
        this.plan();
    }

    plan() {
        console.log(`${this.name} is planning...`);
        const action = this.decideAction();
        this.execute(action);
    }

    decideAction() {
        if (this.goals.length > 0) {
            return `pursue_goal_${this.goals[0]}`;
        }
        return 'idle';
    }

    execute(action) {
        console.log(`${this.name} is executing action: ${action}`);
        this.learn(action);
    }

    learn(action) {
        console.log(`${this.name} is learning from action: ${action}`);
        if (!this.knowledge[action]) {
            this.knowledge[action] = 0;
        }
        this.knowledge[action]++;
    }
}

module.exports = Agent;

// index.js
const Environment = require('./Environment');
const Agent = require('./Agent');

// Create a new environment
const environment = new Environment();

// Create a new agent
const agent = new Agent('Agent1', environment);

// Set a goal for the agent
agent.setGoal('find_food');

// Simulate environment changes
const simulateEnvironmentChanges = async () => {
    for (let i = 0; i < 5; i++) {
        environment.updateState({
            time: Date.now(),
            random_value: Math.random()
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    }
};

simulateEnvironmentChanges();
