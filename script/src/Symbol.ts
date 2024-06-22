export class Symbol {
    private value: string;
    private position: number;
    private active: boolean;
    private symbolElement: HTMLElement;

    constructor(value: string, position: number){
        this.value = value;
        this.position = position;
        this.active = false;

        this.symbolElement = document.createElement('div');
        this.symbolElement.innerText = value;
        this.symbolElement.className = 'symbol-inactive';
    }

    getElement(): HTMLElement{
        return this.symbolElement;
    }

    getPosition(): number{
        return this.position;
    }

    activate(){
        this.symbolElement.className = 'symbol-active';
        this.active = true;
    }    

    deactivate(){
        this.symbolElement.className = 'symbol-inactive'
        this.active = false;
    }

    isActive(): boolean{
        return this.active;
    }

}