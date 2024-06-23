import { Symbol } from "./Symbol.js";

export class Tape {
    private memory: Map<number, Symbol>;
    private tape_visual: HTMLElement;
    private storage: string;
    private headPosition: number;
    private leftMostB: number;
    private rightMostB: number;

    constructor(rawInput: string){
        this.memory = new Map();
        this.tape_visual = document.createElement('div');
        this.tape_visual.className = 'track-active'

        this.headPosition = 0;
        this.storage = 'B';

        let front: Symbol = new Symbol('B', -1);
        this.memory.set(-1, front);
        this.tape_visual.appendChild(front.getElement());
        this.leftMostB = -1;

        if(rawInput.length > 0){
            [...rawInput].forEach((char, index) =>{
                let symbol: Symbol = new Symbol(char, index);    
                this.memory.set(index, symbol);
                if(index==0) {symbol.activate();}
                this.tape_visual.appendChild(symbol.getElement());
            })

            let back: Symbol = new Symbol('B', rawInput.length);
            this.memory.set(rawInput.length, back);
            this.rightMostB = rawInput.length;
            this.tape_visual.appendChild(back.getElement());
        }else{
            let symbol: Symbol = new Symbol('B', 0);   
            this.memory.set(0, symbol);
            symbol.activate();
            this.tape_visual.appendChild(symbol.getElement());

            let back: Symbol = new Symbol('B', 1);
            this.memory.set(1, back);
            this.rightMostB = 1;
            this.tape_visual.appendChild(back.getElement());
        }
        

        console.log(this.memory)
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
        if(this.getPointedValue() != newValue && (this.headPosition == this.leftMostB || this.headPosition == this.rightMostB)){
            if(this.headPosition == this.leftMostB){
                this.leftMostB -= 1;
                let symbol: Symbol = new Symbol('B', this.leftMostB);   
                this.memory.set(this.leftMostB, symbol);
                this.tape_visual.insertBefore(symbol.getElement(), this.tape_visual.firstChild);
            }else if(this.headPosition == this.rightMostB){
                this.rightMostB += 1;
                let symbol: Symbol = new Symbol('B', this.rightMostB);   
                this.memory.set(this.rightMostB, symbol);
                this.tape_visual.appendChild(symbol.getElement());
            }
        }
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