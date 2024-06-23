import { Addition } from './Addition.js';
import { Division } from './Division.js';
import { Exponentiation } from './Exponentiation.js';

let form = document.querySelector('.initial-value');
let addition: Addition;
let exponent: Exponentiation;
let division: Division;

form?.addEventListener('submit', function(event) {
    event.preventDefault();
    const m: number = parseInt((<HTMLInputElement>document.querySelector('[name="m"]')).value);
    const n: number = parseInt((<HTMLInputElement>document.querySelector('[name="n"]')).value);
    division = new Division(m, n);
    console.log("Addition instance created:", division);
});

document.querySelector('#run-button')?.addEventListener('click', function () {
    if (division) {
        console.log("Run method called");
        division.run();
    } else {
        console.error("Addition instance is not defined. Please submit the form first.");
    }
});
