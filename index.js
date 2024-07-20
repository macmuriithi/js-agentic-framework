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
