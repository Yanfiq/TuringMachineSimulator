export class State {
    constructor(value, isAccept) {
        this.value = value;
        this.accept = isAccept;
        this.transition = new Map();
    }
    addTransition({ inputSymbol, storageSymbol = 'B', writeSymbol, writeStorage = 'B', direction, nextState }) {
        this.transition.set([inputSymbol, storageSymbol], [writeSymbol, writeStorage, direction, nextState]);
    }
    removeTransition(inputSymbol, storageSymbol = 'B') {
        this.transition.delete([inputSymbol, storageSymbol]);
    }
    getWriteSymbol(inputSymbol, storageSymbol = 'B') {
        var _a;
        return (_a = this.transition.get([inputSymbol, storageSymbol])) === null || _a === void 0 ? void 0 : _a[0];
    }
    getWriteStorage(inputSymbol, storageSymbol = 'B') {
        var _a;
        return (_a = this.transition.get([inputSymbol, storageSymbol])) === null || _a === void 0 ? void 0 : _a[1];
    }
    getNextDirection(inputSymbol, storageSymbol = 'B') {
        var _a;
        return (_a = this.transition.get([inputSymbol, storageSymbol])) === null || _a === void 0 ? void 0 : _a[2];
    }
    getNextState(inputSymbol, storageSymbol = 'B') {
        var _a;
        return (_a = this.transition.get([inputSymbol, storageSymbol])) === null || _a === void 0 ? void 0 : _a[3];
    }
    getValue() {
        return this.value;
    }
    isAccept() {
        return this.accept;
    }
}
