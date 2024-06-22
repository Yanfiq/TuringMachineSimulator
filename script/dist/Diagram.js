export class Diagram {
    constructor(states, startState) {
        this.states = states;
        this.startState = startState;
    }
    getStartState() {
        return this.startState;
    }
}
