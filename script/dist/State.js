export class State {
    constructor(value, isAccept) {
        this.value = value;
        this.accept = isAccept;
        this.transition = new Map();
    }
    addTransition({ inputSymbol, storageSymbol = 'B', writeSymbol, writeStorage = 'B', direction, nextState }) {
        const key = `${inputSymbol}:${storageSymbol}`;
        this.transition.set(key, [writeSymbol, writeStorage, direction, nextState]);
        // Debugging: Log the state of this.transition
        console.log('Transition Map:', JSON.stringify(Array.from(this.transition.entries())));
        // Optionally log individual values for further inspection
        console.log('inputSymbol:', inputSymbol);
        console.log('storageSymbol:', storageSymbol);
        console.log('writeSymbol:', writeSymbol);
        console.log('writeStorage:', writeStorage);
        console.log('direction:', direction);
        console.log('nextState:', nextState);
    }
    removeTransition(inputSymbol, storageSymbol = 'B') {
        const key = `${inputSymbol}:${storageSymbol}`;
        this.transition.delete(key);
    }
    getWriteSymbol(inputSymbol, storageSymbol = 'B') {
        var _a, _b;
        const key = `${inputSymbol}:${storageSymbol}`;
        return (_b = (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 'B';
    }
    getWriteStorage(inputSymbol, storageSymbol = 'B') {
        var _a, _b;
        const key = `${inputSymbol}:${storageSymbol}`;
        return (_b = (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : 'B';
    }
    getNextDirection(inputSymbol, storageSymbol = 'B') {
        var _a, _b;
        const key = `${inputSymbol}:${storageSymbol}`;
        return (_b = (_a = this.transition.get(key)) === null || _a === void 0 ? void 0 : _a[2]) !== null && _b !== void 0 ? _b : 'B';
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
