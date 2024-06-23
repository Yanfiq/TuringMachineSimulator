import { Symbol } from "./Symbol.js";
export class Tape {
    constructor(rawInput) {
        this.memory = new Map();
        this.tape_visual = document.createElement('div');
        this.tape_visual.className = 'track-active';
        this.headPosition = 0;
        this.storage = 'B';
        let front = new Symbol('B', -1);
        this.memory.set(-1, front);
        this.tape_visual.appendChild(front.getElement());
        this.leftMostB = -1;
        if (rawInput.length > 0) {
            [...rawInput].forEach((char, index) => {
                let symbol = new Symbol(char, index);
                this.memory.set(index, symbol);
                if (index == 0) {
                    symbol.activate();
                }
                this.tape_visual.appendChild(symbol.getElement());
            });
            let back = new Symbol('B', rawInput.length);
            this.memory.set(rawInput.length, back);
            this.rightMostB = rawInput.length;
            this.tape_visual.appendChild(back.getElement());
        }
        else {
            let symbol = new Symbol('B', 0);
            this.memory.set(0, symbol);
            symbol.activate();
            this.tape_visual.appendChild(symbol.getElement());
            let back = new Symbol('B', 1);
            this.memory.set(1, back);
            this.rightMostB = 1;
            this.tape_visual.appendChild(back.getElement());
        }
        console.log(this.memory);
    }
    getHtmlElement() {
        return this.tape_visual;
    }
    getHeadPosition() {
        return this.headPosition;
    }
    getPointedValue() {
        var _a, _b;
        return (_b = (_a = this.memory.get(this.headPosition)) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : 'B';
    }
    changeValue(newValue) {
        var _a;
        if (this.getPointedValue() != newValue && (this.headPosition == this.leftMostB || this.headPosition == this.rightMostB)) {
            if (this.headPosition == this.leftMostB) {
                this.leftMostB -= 1;
                let symbol = new Symbol('B', this.leftMostB);
                this.memory.set(this.leftMostB, symbol);
                this.tape_visual.insertBefore(symbol.getElement(), this.tape_visual.firstChild);
            }
            else if (this.headPosition == this.rightMostB) {
                this.rightMostB += 1;
                let symbol = new Symbol('B', this.rightMostB);
                this.memory.set(this.rightMostB, symbol);
                this.tape_visual.appendChild(symbol.getElement());
            }
        }
        (_a = this.memory.get(this.headPosition)) === null || _a === void 0 ? void 0 : _a.setValue(newValue);
    }
    setStorageValue(newValue) {
        this.storage = newValue;
    }
    getStorageValue() {
        return this.storage;
    }
    moveRight() {
        var _a, _b;
        (_a = this.memory.get(this.headPosition)) === null || _a === void 0 ? void 0 : _a.deactivate();
        this.headPosition += 1;
        (_b = this.memory.get(this.headPosition)) === null || _b === void 0 ? void 0 : _b.activate();
    }
    moveLeft() {
        var _a, _b;
        (_a = this.memory.get(this.headPosition)) === null || _a === void 0 ? void 0 : _a.deactivate();
        this.headPosition -= 1;
        (_b = this.memory.get(this.headPosition)) === null || _b === void 0 ? void 0 : _b.activate();
    }
}
