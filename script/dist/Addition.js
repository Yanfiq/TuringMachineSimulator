import { Diagram } from "./Diagram.js";
import { State } from "./State.js";
import { Tape } from "./Tape.js";
export class Addition {
    constructor(m, n) {
        var _a;
        let q0 = new State('q0', false);
        let q1 = new State('q1', false);
        let q2 = new State('q2', false);
        let q3 = new State('q3', true);
        q0.addTransition({ inputSymbol: '0', writeSymbol: '0', direction: 'R', nextState: q0 });
        q0.addTransition({ inputSymbol: '1', writeSymbol: '0', direction: 'R', nextState: q1 });
        q1.addTransition({ inputSymbol: '0', writeSymbol: '0', direction: 'R', nextState: q1 });
        q1.addTransition({ inputSymbol: '1', writeSymbol: 'B', direction: 'L', nextState: q2 });
        q2.addTransition({ inputSymbol: '0', writeSymbol: '1', direction: 'R', nextState: q3 });
        this.diagram = new Diagram([q0, q1, q2, q3], q0);
        //raw string construction
        let rawInput = (m < 0) ? '1' : '';
        console.log('positive/negative: ' + rawInput);
        for (let i = 0; i < Math.abs(m); i++) {
            rawInput += '0';
            console.log('first number: ' + rawInput);
        }
        rawInput += (n < 0) ? '11' : '1';
        console.log('positive/negative: ' + rawInput);
        for (let i = 0; i < Math.abs(n); i++) {
            rawInput += '0';
            console.log('second number: ' + rawInput);
        }
        let tape = new Tape(rawInput);
        (_a = document.querySelector('.machine')) === null || _a === void 0 ? void 0 : _a.appendChild(tape.getHtmlElement());
    }
}
