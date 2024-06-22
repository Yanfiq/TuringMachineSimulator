import { Addition } from './Addition.js';

let form = document.querySelector('.initial-value');
form?.addEventListener('submit', function(event) {
    event.preventDefault();
    const m: number = parseInt((<HTMLInputElement>document.querySelector('[name="m"]')).value);
    const n: number = parseInt((<HTMLInputElement>document.querySelector('[name="n"]')).value);
    let test = new Addition(m, n);
});