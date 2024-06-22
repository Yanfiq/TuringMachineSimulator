export class Symbol {
    constructor(value, position) {
        this.position = position;
        this.active = false;
        this.symbolElement = document.createElement('div');
        this.symbolElement.innerText = value;
        this.symbolElement.className = 'symbol-inactive';
    }
    getElement() {
        return this.symbolElement;
    }
    getPosition() {
        return this.position;
    }
    getValue() {
        return this.symbolElement.innerText;
    }
    setValue(newValue) {
        this.symbolElement.innerText = newValue;
    }
    activate() {
        this.symbolElement.className = 'symbol-active';
        this.active = true;
    }
    deactivate() {
        this.symbolElement.className = 'symbol-inactive';
        this.active = false;
    }
    isActive() {
        return this.active;
    }
}
