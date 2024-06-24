import { Diagram } from "./Diagram.js";
import { State } from "./State.js";
import { Tape } from "./Tape.js";

export class Exponentiation {
    private diagram: Diagram;
    private tape_input: Tape;
    private tape_multipllier: Tape;
    private tape_result: Tape;
    private intervalId: any;
    result?: number;
    private currentState: State;
    
    constructor(m: number, n: number){
        const q0: State = new State('q0', false);
        const q1: State = new State('q1', false);
        const q2: State = new State('q2', false);
        const q3: State = new State('q3', false);
        const q4: State = new State('q4', false);
        const q5: State = new State('q5', false);
        const q6: State = new State('q6', false);
        const q7: State = new State('q7', false);
        const q8: State = new State('q8', false);
        const q9: State = new State('q9', false);
        const q10: State = new State('q10', false);
        const q11: State = new State('q11', false);
        const q12: State = new State('q12', true)
        const q13: State = new State('q13', false);
        const q14: State = new State('q14', false);
        const q15: State = new State('q15', false);
            
        q0.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RSS', nextState: q15});
        q0.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q15});
        q15.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RSS', nextState: q15});
        q15.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q1});

        q1.addTransition({inputSymbol: 'XBB', writeSymbol: 'XBB', direction: 'RSS', nextState: q1});
        q1.addTransition({inputSymbol: '0BB', writeSymbol: 'XBB', direction: 'LSS', nextState: q2});
        q2.addTransition({inputSymbol: 'XBB', writeSymbol: 'XBB', direction: 'LSS', nextState: q2});
        q2.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'LLL', nextState: q3});

        q3.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'LSS', nextState: q3});
        q3.addTransition({inputSymbol: '000', writeSymbol: '00B', direction: 'LLL', nextState: q3});
        q3.addTransition({inputSymbol: 'B00', writeSymbol: 'B0B', direction: 'SLL', nextState: q3});
        q3.addTransition({inputSymbol: '100', writeSymbol: '10B', direction: 'SLL', nextState: q3});

        q3.addTransition({inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'RRR', nextState: q4});
        q3.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RRR', nextState: q4});
        q4.addTransition({inputSymbol: '0BB', writeSymbol: '00B', direction: 'SSS', nextState: q5});
        q4.addTransition({inputSymbol: '00B', writeSymbol: '00B', direction: 'SSS', nextState: q5});
        q5.addTransition({inputSymbol: '00B', writeSymbol: '000', direction: 'SRR', nextState: q6});
        q5.addTransition({inputSymbol: '10B', writeSymbol: '10B', direction: 'SLL', nextState: q8});
        q6.addTransition({inputSymbol: '00B', writeSymbol: '000', direction: 'SRR', nextState: q6});
        q6.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'SLS', nextState: q7});
        q7.addTransition({inputSymbol: '00B', writeSymbol: '00B', direction: 'SLS', nextState: q7});
        q7.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RRS', nextState: q5});
        q8.addTransition({inputSymbol: '100', writeSymbol: '100', direction: 'SLL', nextState: q8});
        q8.addTransition({inputSymbol: '1B0', writeSymbol: '1B0', direction: 'SSL', nextState: q8});
        q8.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'SRR', nextState: q9});
        q9.addTransition({inputSymbol: '100', writeSymbol: '100', direction: 'SRR', nextState: q9});
        q9.addTransition({inputSymbol: '1B0', writeSymbol: '100', direction: 'SRR', nextState: q9});
        q9.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q1});

        //operation almost finished
        q1.addTransition({inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'LLL', nextState: q10});
        q10.addTransition({inputSymbol: 'X00', writeSymbol: 'X00', direction: 'LLL', nextState: q10});
        q10.addTransition({inputSymbol: '100', writeSymbol: '100', direction: 'LLL', nextState: q10});
        q10.addTransition({inputSymbol: '000', writeSymbol: '000', direction: 'LLL', nextState: q10});
        q10.addTransition({inputSymbol: 'B00', writeSymbol: 'B00', direction: 'SLL', nextState: q10});
        q10.addTransition({inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'RSS', nextState: q11});

        // m is not negative
        q11.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'LSS', nextState: q12});

        // m is negative
        q11.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q13});
        q13.addTransition({inputSymbol: '0BB', writeSymbol: '0BB', direction: 'RSS', nextState: q13});
        q13.addTransition({inputSymbol: '1BB', writeSymbol: '1BB', direction: 'RSS', nextState: q14});
        q14.addTransition({inputSymbol: 'XBB', writeSymbol: 'XB1', direction: 'RSS', nextState: q14});
        q14.addTransition({inputSymbol: 'XB1', writeSymbol: 'XBB', direction: 'RSS', nextState: q14});
        q14.addTransition({inputSymbol: 'BBB', writeSymbol: 'BBB', direction: 'SSS', nextState: q12});
        q14.addTransition({inputSymbol: 'BB1', writeSymbol: 'BB1', direction: 'SSS', nextState: q12});

        this.diagram = new Diagram([q0, q1, q2, q3], q0);

        this.currentState = this.diagram.getStartState();
        
        //raw string construction
        let rawInput: string = (m<0) ? '1' : '';
        for(let i = 0; i<Math.abs(m); i++){
            rawInput += '0';
        }
        rawInput += (n<0) ? '11' : '1';
        for(let i = 0; i<Math.abs(n); i++){
            rawInput += '0';
        }
        this.tape_input = new Tape(rawInput);
        this.tape_multipllier = new Tape('');
        this.tape_result = new Tape('');
        document.querySelector('.machine')?.appendChild(this.tape_input.getHtmlElement());
        document.querySelector('.machine')?.appendChild(this.tape_multipllier.getHtmlElement());
        document.querySelector('.machine')?.appendChild(this.tape_result.getHtmlElement());
    }

    run(interval: number) {
        this.intervalId = setInterval(() => {
            console.log(this.currentState);
            let nextState = this.currentState.getNextState(this.tape_input.getPointedValue()+this.tape_multipllier.getPointedValue()+this.tape_result.getPointedValue());
            let direction = this.currentState.getNextDirection(this.tape_input.getPointedValue()+this.tape_multipllier.getPointedValue()+this.tape_result.getPointedValue());
            let writeSymbol = this.currentState.getWriteSymbol(this.tape_input.getPointedValue()+this.tape_multipllier.getPointedValue()+this.tape_result.getPointedValue());
            if (nextState != undefined) {
                this.currentState = nextState;
                this.tape_input.changeValue(writeSymbol[0]);
                this.tape_multipllier.changeValue(writeSymbol[1]);
                this.tape_result.changeValue(writeSymbol[2]);
                direction[0]=='L' ? this.tape_input.moveLeft() : direction[0]=='R' ? this.tape_input.moveRight() : null;
                direction[1]=='L' ? this.tape_multipllier.moveLeft() : direction[1]=='R' ? this.tape_multipllier.moveRight() : null;
                direction[2]=='L' ? this.tape_result.moveLeft() : direction[2]=='R' ? this.tape_result.moveRight() : null;
            } else {
                if(this.currentState.isAccept()){
                    this.result = 0;
                    let tapeElement = this.tape_result.getHtmlElement()
                    let tapeChild = tapeElement.childNodes
                    let isNegative = false;
                    for(let i=0; i<tapeChild.length; i++){
                        if((<HTMLElement> tapeChild[i]).innerText == "1"){
                            isNegative = true;
                        }
                        this.result += (<HTMLElement> tapeChild[i]).innerText == "0" ? 1:0;
                    }
                    isNegative ? this.result*=-1 : '';
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

    getResult(): number | undefined{
        return this.result
    }
}