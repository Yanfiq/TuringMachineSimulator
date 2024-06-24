import { TuringMachineController } from "./TuringMachineController.js";

let form = document.querySelector('.input-form');
let m: number;
let n: number;
let a: number;
let b: number;7
let controller: TuringMachineController;

form?.addEventListener('submit', function(event) {
    event.preventDefault();
    if(controller === undefined){
        m = parseInt((<HTMLInputElement>document.querySelector('[name="m"]')).value);
        n = parseInt((<HTMLInputElement>document.querySelector('[name="n"]')).value);
        a = parseInt((<HTMLInputElement>document.querySelector('[name="a"]')).value);
        b = parseInt((<HTMLInputElement>document.querySelector('[name="b"]')).value);
        controller = new TuringMachineController(m, n, a, b);
        controller.run();
    }
});


document.querySelector('#tm-setting')?.addEventListener('submit', function(event) {
    event.preventDefault();
    controller.setIntervalDuration(parseInt((<HTMLInputElement>document.querySelector('#intervalDuration')).value));
})