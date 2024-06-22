export class Symbol {
    constructor(value, position) {
        this.value = value;
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
