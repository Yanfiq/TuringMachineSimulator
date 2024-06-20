class Symbol {
    constructor(value) {
        this.stateElement = document.createElement('div');
        this.stateElement.innerHTML = value;
        this.stateElement.className = "symbol-inactive";
        this.active = false;
    }
    getElement() {
        return this.stateElement;
    }
    activate() {
        this.stateElement.className = "symbol-active";
        this.active = true;
    }
    deactivate() {
        this.stateElement.className = "symbol-inactive";
        this.active = false;
    }
    isActive() {
        return this.active;
    }

}

class TrackAddition {
    constructor(m, n) {
        let track = document.createElement('div');
        track.style.display = "flex";
        track.style.flexDirection = "row";
        
        for (let i = 0; i < m; i++) {
            let state = new Symbol(0);
            if(i==0){
                state.activate();
            }
            track.appendChild(state.getElement());
        }
        
        let divider = new Symbol(1);
        track.appendChild(divider.getElement());
        
        for (let i = 0; i < n; i++) {
            let state = new Symbol(0);
            track.appendChild(state.getElement());
        }  
        document.querySelector('.machine').appendChild(track);
    }
}

let form = document.querySelector('.initial-value');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const m = document.querySelector('[name="m"]').value;
    const n = document.querySelector('[name="n"]').value;
    let test = new TrackAddition(m, n);
});
