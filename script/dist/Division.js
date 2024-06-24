import { Diagram } from "./Diagram.js";
import { State } from "./State.js";
import { Tape } from "./Tape.js";
export class Division {
    constructor(m, n) {
        var _a, _b, _c;
        const q0 = new State('q0', false);
        const q1 = new State('q1', false);
        const q2 = new State('q2', false);
        const q3 = new State('q3', false);
        const q4 = new State('q4', false);
        const q5 = new State('q5', false);
        const q6 = new State('q6', true);
        const q7 = new State('q7', false);
        const q8 = new State('q8', false);
        const q9 = new State('q9', false);
        const q10 = new State('q9', false);
        q0.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RSS', nextState: q7 });
        q0.addTransition({ inputSymbol: '1BB', writeSymbol: '1B1', direction: 'RSS', nextState: q7 });
        q7.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RSS', nextState: q7 });
        q7.addTransition({ inputSymbol: '0B1', writeSymbol: '0B1', direction: 'RSS', nextState: q7 });
        q7.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q8 });
        q7.addTransition({ inputSymbol: '1B1', writeSymbol: '1B1', direction: 'RSS', nextState: q8 });
        q7.addTransition({ inputSymbol: 'BB1', writeSymbol: 'BB1', direction: 'SSS', nextState: q6 });
        q8.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'SSS', nextState: q1 });
        q8.addTransition({ inputSymbol: '0B1', writeSymbol: '0B1', direction: 'SSR', nextState: q1 });
        q8.addTransition({ inputSymbol: '1B1', writeSymbol: '1BB', direction: 'RSR', nextState: q1 });
        q8.addTransition({ inputSymbol: '1BB', writeSymbol: '1B1', direction: 'RSR', nextState: q1 });
        q1.addTransition({ inputSymbol: '0BB', writeSymbol: '00B', direction: 'RRS', nextState: q1 });
        q1.addTransition({ inputSymbol: '0B1', writeSymbol: '001', direction: 'RRS', nextState: q1 });
        q1.addTransition({ inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'LLS', nextState: q2 });
        q1.addTransition({ inputSymbol: 'BB1', writeSymbol: 'BBB', direction: 'LLS', nextState: q2 });
        q2.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'LSS', nextState: q2 });
        q2.addTransition({ inputSymbol: '00B', writeSymbol: '00B', direction: 'LLS', nextState: q2 });
        q2.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'LSS', nextState: q9 });
        q2.addTransition({ inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'RRS', nextState: q3 });
        q9.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'LSS', nextState: q9 });
        q9.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'LSS', nextState: q2 });
        q9.addTransition({ inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'RSS', nextState: q10 });
        q10.addTransition({ inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RRS', nextState: q3 });
        q10.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'SRS', nextState: q3 });
        q3.addTransition({ inputSymbol: '00B', writeSymbol: 'X0B', direction: 'RRS', nextState: q3 });
        q3.addTransition({ inputSymbol: '0BB', writeSymbol: '0B0', direction: 'SLR', nextState: q4 });
        q3.addTransition({ inputSymbol: '1BB', writeSymbol: '1B0', direction: 'SSS', nextState: q6 });
        q3.addTransition({ inputSymbol: '10B', writeSymbol: '10B', direction: 'SSS', nextState: q6 });
        q4.addTransition({ inputSymbol: '00B', writeSymbol: '00B', direction: 'SLS', nextState: q4 });
        q4.addTransition({ inputSymbol: '0BB', writeSymbol: '0BB', direction: 'SRS', nextState: q5 });
        q5.addTransition({ inputSymbol: '00B', writeSymbol: 'X0B', direction: 'RRS', nextState: q3 });
        this.diagram = new Diagram([q0, q1, q2, q3, q4, q5], q0);
        this.currentState = this.diagram.getStartState();
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
        this.tape_divider = new Tape('');
        this.tape_result = new Tape('');
        (_a = document.querySelector('.machine')) === null || _a === void 0 ? void 0 : _a.appendChild(this.tape_input.getHtmlElement());
        (_b = document.querySelector('.machine')) === null || _b === void 0 ? void 0 : _b.appendChild(this.tape_divider.getHtmlElement());
        (_c = document.querySelector('.machine')) === null || _c === void 0 ? void 0 : _c.appendChild(this.tape_result.getHtmlElement());
    }
    run(interval) {
        this.intervalId = setInterval(() => {
            console.log(this.currentState);
            let nextState = this.currentState.getNextState(this.tape_input.getPointedValue() + this.tape_divider.getPointedValue() + this.tape_result.getPointedValue());
            let direction = this.currentState.getNextDirection(this.tape_input.getPointedValue() + this.tape_divider.getPointedValue() + this.tape_result.getPointedValue());
            let writeSymbol = this.currentState.getWriteSymbol(this.tape_input.getPointedValue() + this.tape_divider.getPointedValue() + this.tape_result.getPointedValue());
            if (nextState != undefined) {
                this.currentState = nextState;
                this.tape_input.changeValue(writeSymbol[0]);
                this.tape_divider.changeValue(writeSymbol[1]);
                this.tape_result.changeValue(writeSymbol[2]);
                direction[0] == 'L' ? this.tape_input.moveLeft() : direction[0] == 'R' ? this.tape_input.moveRight() : null;
                direction[1] == 'L' ? this.tape_divider.moveLeft() : direction[1] == 'R' ? this.tape_divider.moveRight() : null;
                direction[2] == 'L' ? this.tape_result.moveLeft() : direction[2] == 'R' ? this.tape_result.moveRight() : null;
            }
            else {
                if (this.currentState.isAccept()) {
                    this.result = 0;
                    let tapeElement = this.tape_result.getHtmlElement();
                    let tapeChild = tapeElement.childNodes;
                    let isNegative = false;
                    for (let i = 0; i < tapeChild.length; i++) {
                        if (tapeChild[i].innerText == "1") {
                            isNegative = true;
                        }
                        this.result += tapeChild[i].innerText == "0" ? 1 : 0;
                    }
                    isNegative ? this.result *= -1 : '';
                }
                this.stop();
            }
        }, interval);
    }
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    getResult() {
        return this.result;
    }
}
