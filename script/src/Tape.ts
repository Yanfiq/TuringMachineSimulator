import { Symbol } from "./Symbol.js";

export class Tape {
    private memory: Map<number, string>;
    private tape_visual: HTMLElement;
    private storage: string;
    private headPosition: number;

    constructor(rawInput: string){
        this.memory = new Map();
        this.tape_visual = document.createElement('div');
        this.tape_visual.className = 'track-active'

        this.headPosition = 0;
        this.storage = 'B';

        this.memory.set(-1, 'B');
        let front: Symbol = new Symbol('B', -1);
        this.tape_visual.appendChild(front.getElement());

        [...rawInput].forEach((char, index) =>{
            this.memory.set(index, char);
            let symbol: Symbol = new Symbol(char, index);    
            if(index==0) {symbol.activate();}
            this.tape_visual.appendChild(symbol.getElement());
        })
        this.memory.set(rawInput.length+1, 'B');
        let back: Symbol = new Symbol('B', rawInput.length+1);
        this.tape_visual.appendChild(back.getElement());
    }

    getHtmlElement(): HTMLElement{
        return this.tape_visual;
    }

    getHeadPosition(): number{
        return this.headPosition;
    }

    getPointedValue(): string | undefined{
        return this.memory.get(this.headPosition);
    }

    changeValue(newValue: string): void{
        this.memory.set(this.headPosition, newValue);
    }

    setStorageValue(newValue: string): void{
        this.storage = newValue;
    }

    getStorageValue(): string{
        return this.storage;
    }

    moveRight(): void{
        this.headPosition+=1;
    }

    moveLeft(): void{
        this.headPosition-=1;
    }
}