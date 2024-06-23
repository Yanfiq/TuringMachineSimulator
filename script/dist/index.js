var _a;
import { TuringMachineController } from "./TuringMachineController.js";
let form = document.querySelector('.input-form');
let m;
let n;
let a;
let b;
let controller;
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
    event.preventDefault();
    m = parseInt(document.querySelector('[name="m"]').value);
    n = parseInt(document.querySelector('[name="n"]').value);
    a = parseInt(document.querySelector('[name="a"]').value);
    b = parseInt(document.querySelector('[name="b"]').value);
    controller = new TuringMachineController(m, n, a, b);
    controller.run();
});
(_a = document.querySelector('#tm-setting')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    controller.setIntervalDuration(parseInt(document.querySelector('#intervalDuration').value));
});
