import { Addition } from './Addition.js';

let form = document.querySelector('.initial-value');
let test: Addition;

form?.addEventListener('submit', function(event) {
    event.preventDefault();
    const m: number = parseInt((<HTMLInputElement>document.querySelector('[name="m"]')).value);
    const n: number = parseInt((<HTMLInputElement>document.querySelector('[name="n"]')).value);
    test = new Addition(m, n);
    console.log("Addition instance created:", test);
});

document.querySelector('#run-button')?.addEventListener('click', function () {
    if (test) {
        console.log("Run method called");
        test.run();
    } else {
        console.error("Addition instance is not defined. Please submit the form first.");
    }
});
