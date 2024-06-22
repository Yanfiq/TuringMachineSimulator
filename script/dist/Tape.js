import { Symbol } from "./Symbol.js";
export class Tape {
    constructor(rawInput) {
        this.memory = new Map();
        this.tape_visual = document.createElement('div');
        this.tape_visual.className = 'track-active';
        this.headPosition = 0;
        this.storage = 'B';
        this.memory.set(-1, 'B');
        let front = new Symbol('B', -1);
        this.tape_visual.appendChild(front.getElement());
        [...rawInput].forEach((char, index) => {
            this.memory.set(index, char);
            let symbol = new Symbol(char, index);
            if (index == 0) {
                symbol.activate();
            }
            this.tape_visual.appendChild(symbol.getElement());
        });
        this.memory.set(rawInput.length + 1, 'B');
        let back = new Symbol('B', rawInput.length + 1);
        this.tape_visual.appendChild(back.getElement());
    }
    getHtmlElement() {
        return this.tape_visual;
    }
    getHeadPosition() {
        return this.headPosition;
    }
    getPointedValue() {
        return this.memory.get(this.headPosition);
    }
    changeValue(newValue) {
        this.memory.set(this.headPosition, newValue);
    }
    setStorageValue(newValue) {
        this.storage = newValue;
    }
    getStorageValue() {
        return this.storage;
    }
    moveRight() {
        this.headPosition += 1;
    }
    moveLeft() {
        this.headPosition -= 1;
    }
}
