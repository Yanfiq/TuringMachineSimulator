import { Diagram } from "./Diagram.js";
import { State } from "./State.js";
import { Tape } from "./Tape.js";

export class Addition {
    private diagram: Diagram;
    private tape: Tape;
    private intervalId: any;
    private result?: number;
    
    constructor(m: number, n: number){
        const q0: State = new State('q0', false);
        const q1: State = new State('q1', false);
        const q2: State = new State('q2', false);
        const q3: State = new State('q3', true);
            
        q0.addTransition({inputSymbol: '0', writeSymbol: '0', direction: 'R', nextState: q0});
        q0.addTransition({inputSymbol: '1', writeSymbol: '0', direction: 'R', nextState: q1});
        q1.addTransition({inputSymbol: '0', writeSymbol: '0', direction: 'R', nextState: q1});
        q1.addTransition({inputSymbol: 'B', writeSymbol: 'B', direction: 'L', nextState: q2});
        q2.addTransition({inputSymbol: '0', writeSymbol: 'B', direction: 'R', nextState: q3});

        this.diagram = new Diagram([q0, q1, q2, q3], q0);
        
        //raw string construction
        let rawInput: string = (m<0) ? '1' : '';
        for(let i = 0; i<Math.abs(m); i++){
            rawInput += '0';
        }
        rawInput += (n<0) ? '11' : '1';
        for(let i = 0; i<Math.abs(n); i++){
            rawInput += '0';
        }
        this.tape = new Tape(rawInput);
        document.querySelector('.machine')?.appendChild(this.tape.getHtmlElement());
    }

    run() {
        console.log("run");
        let currentState: State = this.diagram.getStartState();
        this.intervalId = setInterval(() => {
            let nextState = currentState.getNextState(this.tape.getPointedValue());
            let direction = currentState.getNextDirection(this.tape.getPointedValue())[0];
            let writeSymbol = currentState.getWriteSymbol(this.tape.getPointedValue())[0];
            if (nextState != undefined) {
                currentState = nextState;
                this.tape.changeValue(writeSymbol);
                if (direction == 'L') {
                    this.tape.moveLeft();
                } else {
                    this.tape.moveRight();
                }
            } else {
                if(currentState.isAccept()){
                    this.result = 0;
                    let tapeElement = this.tape.getHtmlElement()
                    let tapeChild = tapeElement.childNodes
                    for(let i=0; i<tapeChild.length; i++){
                        this.result += (<HTMLElement> tapeChild[i]).innerText == "0" ? 1:0;
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

    getResult(): number | undefined{
        return this.result
    }
}