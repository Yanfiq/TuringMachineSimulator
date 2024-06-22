import { State } from "./State";

type CharDirectionCode = 'R' | 'L'

export interface Transition {
    inputSymbol: string;
    storageSymbol?: string;
    writeSymbol: string;
    writeStorage?: string;
    direction: CharDirectionCode;
    nextState: State;
}