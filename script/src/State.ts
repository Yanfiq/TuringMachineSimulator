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
    
    removeTransition(inputSymbol: string, storageSymbol: string = 'B'): void {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        this.transition.delete(key);
    }
    
    getWriteSymbol(inputSymbol: string, storageSymbol: string = 'B'): string {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return this.transition.get(key)?.[0] ?? 'B';
    }
    
    getWriteStorage(inputSymbol: string, storageSymbol: string = 'B'): string {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return this.transition.get(key)?.[1] ?? 'B';
    }
    
    getNextDirection(inputSymbol: string, storageSymbol: string = 'B'): string {
        const key: string = `${inputSymbol}:${storageSymbol}`;
        return this.transition.get(key)?.[2] ?? 'B';
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
