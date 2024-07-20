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
