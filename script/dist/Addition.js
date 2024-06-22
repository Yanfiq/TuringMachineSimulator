import { Diagram } from "./Diagram.js";
import { State } from "./State.js";
import { Tape } from "./Tape.js";
export class Addition {
    constructor(m, n) {
        var _a;
        const q0 = new State('q0', false);
        const q1 = new State('q1', false);
        const q2 = new State('q2', false);
        const q3 = new State('q3', true);
        q0.addTransition({ inputSymbol: '0', writeSymbol: '0', direction: 'R', nextState: q0 });
        q0.addTransition({ inputSymbol: '1', writeSymbol: '0', direction: 'R', nextState: q1 });
        q1.addTransition({ inputSymbol: '0', writeSymbol: '0', direction: 'R', nextState: q1 });
        q1.addTransition({ inputSymbol: 'B', writeSymbol: 'B', direction: 'L', nextState: q2 });
        q2.addTransition({ inputSymbol: '0', writeSymbol: 'B', direction: 'R', nextState: q3 });
        this.diagram = new Diagram([q0, q1, q2, q3], q0);
        //raw string construction
        let rawInput = (m < 0) ? '1' : '';
        for (let i = 0; i < Math.abs(m); i++) {
            rawInput += '0';
        }
        rawInput += (n < 0) ? '11' : '1';
        for (let i = 0; i < Math.abs(n); i++) {
            rawInput += '0';
        }
        this.tape = new Tape(rawInput);
        (_a = document.querySelector('.machine')) === null || _a === void 0 ? void 0 : _a.appendChild(this.tape.getHtmlElement());
    }
    run() {
        console.log("run");
        let currentState = this.diagram.getStartState();
        this.intervalId = setInterval(() => {
            let nextState = currentState.getNextState(this.tape.getPointedValue());
            let direction = currentState.getNextDirection(this.tape.getPointedValue());
            let writeSymbol = currentState.getWriteSymbol(this.tape.getPointedValue());
            if (nextState != undefined) {
                currentState = nextState;
                this.tape.changeValue(writeSymbol);
                if (direction == 'L') {
                    this.tape.moveLeft();
                }
                else {
                    this.tape.moveRight();
                }
            }
            else {
                if (currentState.isAccept()) {
                    this.result = 0;
                    let tapeElement = this.tape.getHtmlElement();
                    let tapeChild = tapeElement.childNodes;
                    for (let i = 0; i < tapeChild.length; i++) {
                        this.result += tapeChild[i].innerText == "0" ? 1 : 0;
                    }
                }
                this.stop();
            }
        }, 500);
    }
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log("Turing machine stopped");
        }
    }
    getResult() {
        return this.result;
    }
}
