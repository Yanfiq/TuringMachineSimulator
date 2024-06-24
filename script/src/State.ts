import { Transition } from "./Transition.js";

export class State {
    private value: string;
    private accept: boolean;
    private transition: Map<string, [string, string, string, State]>;

    constructor(value: string, isAccept: boolean) {
        this.value = value;
        this.accept = isAccept;
        this.transition = new Map<string, [string, string, string, State]>();
    }

    addTransition({ inputSymbol, storageSymbol = 'B', writeSymbol, writeStorage = 'B', direction, nextState }: Transition): void {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        this.transition.set(key, [writeSymbol, writeStorage, direction, nextState]);
    }
    
    removeTransition(inputSymbol: string, storageSymbol: string = 'B'): void {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        this.transition.delete(key);
    }
    
    getWriteSymbol(inputSymbol: string, storageSymbol: string = 'B'): string[] {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return Array.from(this.transition.get(key)?.[0] ?? 'B');
    }
    
    getWriteStorage(inputSymbol: string, storageSymbol: string = 'B'): string[] {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return Array.from(this.transition.get(key)?.[1] ?? 'B');
    }
    
    getNextDirection(inputSymbol: string, storageSymbol: string = 'B'): string[] {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return Array.from(this.transition.get(key)?.[2] ?? 'B');
    }
    
    getNextState(inputSymbol: string, storageSymbol: string = 'B'): State | undefined {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return this.transition.get(key)?.[3];
    }

    getValue(): string {
        return this.value;
    }

    isAccept(): boolean {
        return this.accept;
    }
}