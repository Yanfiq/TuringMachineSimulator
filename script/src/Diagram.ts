import { State } from './State';

export class Diagram {
    private states: State[];
    private startState: State;

    constructor(states: State[], startState: State) {
        this.states = states;
        this.startState = startState;
    }

    getStartState(): State {
        return this.startState;
    }
}
