var _a;
import { Exponentiation } from './Exponentiation.js';
let form = document.querySelector('.initial-value');
let test;
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
    event.preventDefault();
    const m = parseInt(document.querySelector('[name="m"]').value);
    const n = parseInt(document.querySelector('[name="n"]').value);
    test = new Exponentiation(m, n);
    console.log("Addition instance created:", test);
});
(_a = document.querySelector('#run-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    if (test) {
        console.log("Run method called");
        test.run();
    }
    else {
        console.error("Addition instance is not defined. Please submit the form first.");
    }
});
