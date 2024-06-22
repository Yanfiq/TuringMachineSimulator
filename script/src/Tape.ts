import { Symbol } from "./Symbol.js";

export class Tape {
    private memory: Map<number, Symbol>;
    private tape_visual: HTMLElement;
    private storage: string;
    private headPosition: number;

    constructor(rawInput: string){
        this.memory = new Map();
        this.tape_visual = document.createElement('div');
        this.tape_visual.className = 'track-active'

        this.headPosition = 0;
        this.storage = 'B';

        let front: Symbol = new Symbol('B', -1);
        this.memory.set(-1, front);
        this.tape_visual.appendChild(front.getElement());

        [...rawInput].forEach((char, index) =>{
            let symbol: Symbol = new Symbol(char, index);    
            this.memory.set(index, symbol);
            if(index==0) {symbol.activate();}
            this.tape_visual.appendChild(symbol.getElement());
        })
        
        let back: Symbol = new Symbol('B', rawInput.length);
        this.memory.set(rawInput.length, back);
        console.log(this.memory)
        this.tape_visual.appendChild(back.getElement());
    }

    getHtmlElement(): HTMLElement{
        return this.tape_visual;
    }

    getHeadPosition(): number{
        return this.headPosition;
    }

    getPointedValue(): string{
        return this.memory.get(this.headPosition)?.getValue() ?? 'B';
    }

    changeValue(newValue: string): void{
        this.memory.get(this.headPosition)?.setValue(newValue);
    }

    setStorageValue(newValue: string): void{
        this.storage = newValue;
    }

    getStorageValue(): string{
        return this.storage;
    }

    moveRight(): void{
        this.memory.get(this.headPosition)?.deactivate()
        this.headPosition+=1;
        this.memory.get(this.headPosition)?.activate()
    }

    moveLeft(): void{
        this.memory.get(this.headPosition)?.deactivate()
        this.headPosition-=1;
        this.memory.get(this.headPosition)?.activate()
    }
}