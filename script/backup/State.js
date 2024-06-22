export class State{
    constructor(value, isAccept){
        this.value = value;
        this.accept = isAccept;
        this.transition = new Map();
    }

    addTransition(inputSymbol, destination){
        this.transition.set(inputSymbol, destination);
    }

    removeTransition(inputSymbol){
        this.transition.delete(inputSymbol);
    }

    getNextState(inputSymbol){
        return this.transition.get(inputSymbol);
    }

    getValue(){
        return this.value;
    }

    isAccept(){
        return this.accept;
    }
}