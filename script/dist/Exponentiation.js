import { Diagram } from "./Diagram.js";
import { State } from "./State.js";
import { Tape } from "./Tape.js";
export class Exponentiation {
    constructor(m, n) {
        var _a, _b, _c;
        const q0 = new State('q0', false);
        const q1 = new State('q1', false);
        const q2 = new State('q2', false);
        const q3 = new State('q3', false);
        const q4 = new State('q4', false);
        const q5 = new State('q5', false);
        const q6 = new State('q6', false);
        const q7 = new State('q7', false);
        const q8 = new State('q8', false);
        const q9 = new State('q9', false);
        const q10 = new State('q10', false);
        q0.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RSS', nextState: q0 });
        q0.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q1 });
        q1.addTransition({ inputSymbol: 'XBB', writeSymbol: 'XBB', direction: 'RSS', nextState: q1 });
        q1.addTransition({ inputSymbol: '0BB', writeSymbol: 'XBB', direction: 'LSS', nextState: q2 });
        q2.addTransition({ inputSymbol: 'XBB', writeSymbol: 'XBB', direction: 'LSS', nextState: q2 });
        q2.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'LLL', nextState: q3 });
        q3.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'LSS', nextState: q3 });
        q3.addTransition({ inputSymbol: '000', writeSymbol: '00B', direction: 'LLL', nextState: q3 });
        q3.addTransition({ inputSymbol: 'B00', writeSymbol: 'B0B', direction: 'SLL', nextState: q3 });
        q3.addTransition({ inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'RRR', nextState: q4 });
        q4.addTransition({ inputSymbol: '0BB', writeSymbol: '00B', direction: 'SSS', nextState: q5 });
        q4.addTransition({ inputSymbol: '00B', writeSymbol: '00B', direction: 'SSS', nextState: q5 });
        q5.addTransition({ inputSymbol: '00B', writeSymbol: '000', direction: 'SRR', nextState: q6 });
        q5.addTransition({ inputSymbol: '10B', writeSymbol: '10B', direction: 'SLL', nextState: q8 });
        q6.addTransition({ inputSymbol: '00B', writeSymbol: '000', direction: 'SRR', nextState: q6 });
        q6.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'SLS', nextState: q7 });
        q7.addTransition({ inputSymbol: '00B', writeSymbol: '00B', direction: 'SLS', nextState: q7 });
        q7.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RRS', nextState: q5 });
        q8.addTransition({ inputSymbol: '100', writeSymbol: '100', direction: 'SLL', nextState: q8 });
        q8.addTransition({ inputSymbol: '1B0', writeSymbol: '1B0', direction: 'SSL', nextState: q8 });
        q8.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'SRR', nextState: q9 });
        q9.addTransition({ inputSymbol: '100', writeSymbol: '100', direction: 'SRR', nextState: q9 });
        q9.addTransition({ inputSymbol: '1B0', writeSymbol: '100', direction: 'SRR', nextState: q9 });
        q9.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q1 });
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
        this.tape_input = new Tape(rawInput);
        this.tape_multipllier = new Tape('');
        this.tape_result = new Tape('');
        (_a = document.querySelector('.machine')) === null || _a === void 0 ? void 0 : _a.appendChild(this.tape_input.getHtmlElement());
        (_b = document.querySelector('.machine')) === null || _b === void 0 ? void 0 : _b.appendChild(this.tape_multipllier.getHtmlElement());
        (_c = document.querySelector('.machine')) === null || _c === void 0 ? void 0 : _c.appendChild(this.tape_result.getHtmlElement());
    }
    run() {
        console.log("run");
        let currentState = this.diagram.getStartState();
        this.intervalId = setInterval(() => {
            console.log(currentState);
            let nextState = currentState.getNextState(this.tape_input.getPointedValue() + this.tape_multipllier.getPointedValue() + this.tape_result.getPointedValue());
            let direction = currentState.getNextDirection(this.tape_input.getPointedValue() + this.tape_multipllier.getPointedValue() + this.tape_result.getPointedValue());
            let writeSymbol = currentState.getWriteSymbol(this.tape_input.getPointedValue() + this.tape_multipllier.getPointedValue() + this.tape_result.getPointedValue());
            if (nextState != undefined) {
                currentState = nextState;
                this.tape_input.changeValue(writeSymbol[0]);
                this.tape_multipllier.changeValue(writeSymbol[1]);
                this.tape_result.changeValue(writeSymbol[2]);
                direction[0] == 'L' ? this.tape_input.moveLeft() : direction[0] == 'R' ? this.tape_input.moveRight() : null;
                direction[1] == 'L' ? this.tape_multipllier.moveLeft() : direction[1] == 'R' ? this.tape_multipllier.moveRight() : null;
                direction[2] == 'L' ? this.tape_result.moveLeft() : direction[2] == 'R' ? this.tape_result.moveRight() : null;
            }
            else {
                if (currentState.isAccept()) {
                    this.result = 0;
                    let tapeElement = this.tape_result.getHtmlElement();
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
