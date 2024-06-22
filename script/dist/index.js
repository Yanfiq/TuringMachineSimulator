import { Addition } from './Addition.js';
let form = document.querySelector('.initial-value');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
    event.preventDefault();
    const m = parseInt(document.querySelector('[name="m"]').value);
    const n = parseInt(document.querySelector('[name="n"]').value);
    let test = new Addition(m, n);
});
