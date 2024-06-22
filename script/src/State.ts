import { Transition } from "./Transition";

export class State {
    private value: string;
    private accept: boolean;
    private transition: Map<[string, string], [string, string, string, State]>;

    constructor(value: string, isAccept: boolean) {
        this.value = value;
        this.accept = isAccept;
        this.transition = new Map();
    }

    addTransition({inputSymbol, storageSymbol ='B', writeSymbol, writeStorage ='B', direction, nextState}: Transition): void {
        this.transition.set([inputSymbol, storageSymbol], [writeSymbol, writeStorage, direction, nextState]);
    }

    removeTransition(inputSymbol: string, storageSymbol: string = 'B'): void {
        this.transition.delete([inputSymbol, storageSymbol]);
    }

    getWriteSymbol(inputSymbol: string, storageSymbol: string = 'B'): string | undefined {
        return this.transition.get([inputSymbol, storageSymbol])?.[0];
    }

    getWriteStorage(inputSymbol: string, storageSymbol: string = 'B'): string | undefined {
        return this.transition.get([inputSymbol, storageSymbol])?.[1];
    }

    getNextDirection(inputSymbol: string, storageSymbol: string = 'B'): string | undefined {
        return this.transition.get([inputSymbol, storageSymbol])?.[2];
    }

    getNextState(inputSymbol: string, storageSymbol: string = 'B'): State | undefined {
        return this.transition.get([inputSymbol, storageSymbol])?.[3];
    }

    getValue(): string {
        return this.value;
    }

    isAccept(): boolean {
        return this.accept;
    }
}
