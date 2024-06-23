export class State {
    constructor(value, isAccept) {
        this.value = value;
        this.accept = isAccept;
        this.transition = new Map();
    }
    addTransition({ inputSymbol, storageSymbol = 'B', writeSymbol, writeStorage = 'B', direction, nextState }) {
        const key = `${inputSymbol}:${storageSymbol}`;
        this.transition.set(key, [writeSymbol, writeStorage, direction, nextState]);
    }
    removeTransition(inputSymbol, storageSymbol = 'B') {
        const key = `${inputSymbol}:${storageSymbol}`;
        this.transition.delete(key);
    }
    getWriteSymbol(inputSymbol, storageSymbol = 'B') {
        var _a, _b;
        const key = `${inputSymbol}:${storageSymbol}`;
        return Array.from((_b = (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 'B');
    }
    getWriteStorage(inputSymbol, storageSymbol = 'B') {
        var _a, _b;
        const key = `${inputSymbol}:${storageSymbol}`;
        return Array.from((_b = (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : 'B');
    }
    getNextDirection(inputSymbol, storageSymbol = 'B') {
        var _a, _b;
        const key = `${inputSymbol}:${storageSymbol}`;
        return Array.from((_b = (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[2]) !== null && _b !== void 0 ? _b : 'B');
    }
    getNextState(inputSymbol, storageSymbol = 'B') {
        var _a;
        const key = `${inputSymbol}:${storageSymbol}`;
        return (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[3];
    }
    getValue() {
        return this.value;
    }
    isAccept() {
        return this.accept;
    }
}
