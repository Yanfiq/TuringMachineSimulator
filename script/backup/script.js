import { Symbol } from './Symbol.js'

class TrackAddition {
    constructor(m, n) {
        this.symbols = new Map();
        this.headPosition = 0;
        this.isForward = true;
        this.isBackward = false;
        let track = document.createElement('div');
        track.style.display = "flex";
        track.style.flexDirection = "row";
        
        let symbol_left = new Symbol('B', -1);
        track.appendChild(symbol_left.getElement());
        this.symbols.set(-1, symbol_left);  
        for (let i = 0; i < m; i++) {
            let symbol = new Symbol(0, i);
            console.log(i);
            if(i==0){
                symbol.activate();
            }
            track.appendChild(symbol.getElement());
            this.symbols.set(i, symbol);
        }
        
        let divider = new Symbol(1, +m);
        track.appendChild(divider.getElement());
        this.symbols.set(+m, divider);
        console.log(+m);
        
        for (let i = 0; i < n; i++) {
            console.log(+i + +m + +1);
            let symbol = new Symbol(0, +i + +m + +1);
            track.appendChild(symbol.getElement());
            this.symbols.set(+i + +m + +1, symbol);
        }  

        let symbol_right = new Symbol('B',+m + +n + 1);
        track.appendChild(symbol_right.getElement());
        this.symbols.set(+m + +n +1, symbol_right);

        document.querySelector('.machine').appendChild(track);
    }

    run() {
        setInterval(() => {
            let currentSymbol = this.symbols.get(this.headPosition);
            let currentSymbolElement = currentSymbol.getElement();
            console.log(currentSymbolElement.innerHTML);
            if(currentSymbolElement.innerHTML == 1){
                currentSymbolElement.innerHTML = 0;
            }
    
            currentSymbol.deactivate();

            if(currentSymbolElement.innerHTML == "B"){
                this.isForward = !this.isForward;
                this.isBackward = !this.isBackward;
                
            }

            if(this.isForward){
                this.headPosition += 1;
                this.symbols.get(this.headPosition).activate();
            }else{
                this.headPosition -= 1;
                this.symbols.get(this.headPosition).activate();
            }
        }, 500);
    }
    
}

let form = document.querySelector('.initial-value');
let test = null;
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const m = document.querySelector('[name="m"]').value;
    const n = document.querySelector('[name="n"]').value;
    test = new TrackAddition(m, n);
});

document.querySelector('#run-button').addEventListener('click', function () { 
    test.run();
 })
