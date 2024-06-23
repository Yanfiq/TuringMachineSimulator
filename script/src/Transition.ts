import { State } from "./State";

export interface Transition {
    inputSymbol: string;
    storageSymbol?: string;
    writeSymbol: string;
    writeStorage?: string;
    direction: string;
    nextState: State;
}