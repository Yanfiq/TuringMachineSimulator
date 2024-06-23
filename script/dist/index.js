var _a;
import { Division } from './Division.js';
let form = document.querySelector('.initial-value');
let addition;
let exponent;
let division;
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
    event.preventDefault();
    const m = parseInt(document.querySelector('[name="m"]').value);
    const n = parseInt(document.querySelector('[name="n"]').value);
    division = new Division(m, n);
    console.log("Addition instance created:", division);
});
(_a = document.querySelector('#run-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    if (division) {
        console.log("Run method called");
        division.run();
    }
    else {
        console.error("Addition instance is not defined. Please submit the form first.");
    }
});
