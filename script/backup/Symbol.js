export class Symbol {
    constructor(value, position) {
        this.stateElement = document.createElement('div');
        this.stateElement.innerHTML = value;
        this.stateElement.className = "symbol-inactive";
        this.active = false;
        this.position = position;
    }
    getElement() {
        return this.stateElement;
    }
    getPosition() {
        return this.position;
    }
    activate() {
        this.stateElement.className = "symbol-active";
        this.active = true;
    }
    deactivate() {
        this.stateElement.className = "symbol-inactive";
        this.active = false;
    }
    isActive() {
        return this.active;
    }
}