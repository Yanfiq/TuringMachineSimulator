import { TuringMachineController } from "./TuringMachineController.js";

let form = document.querySelector('.input-form');
let m: number;
let n: number;
let a: number;
let b: number;

form?.addEventListener('submit', function(event) {
    event.preventDefault();
    m = parseInt((<HTMLInputElement>document.querySelector('[name="m"]')).value);
    n = parseInt((<HTMLInputElement>document.querySelector('[name="n"]')).value);
    a = parseInt((<HTMLInputElement>document.querySelector('[name="a"]')).value);
    b = parseInt((<HTMLInputElement>document.querySelector('[name="b"]')).value);
    const controller = new TuringMachineController(m, n, a, b);
    controller.run();
});
