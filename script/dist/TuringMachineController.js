var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Addition } from "./Addition.js";
import { Exponentiation } from "./Exponentiation.js";
import { Division } from "./Division.js";
export class TuringMachineController {
    constructor(m, n, a, b) {
        this.m = m;
        this.n = n;
        this.a = a;
        this.b = b;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const additionResult = yield this.runAddition(this.m, this.n);
                const exponentiationResult = yield this.runExponentiation(additionResult, this.a);
                const divisionResult = yield this.runDivision(exponentiationResult, this.b);
                this.result = divisionResult;
                console.log(`Final Result: ${this.result}`);
            }
            catch (error) {
                console.error("Error running the Turing machines:", error);
            }
        });
    }
    runAddition(m, n) {
        return new Promise((resolve, reject) => {
            const addition = new Addition(m, n);
            addition.run();
            const intervalId = setInterval(() => {
                if (addition.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(addition.getResult());
                }
            }, 200);
        });
    }
    runExponentiation(base, exponent) {
        return new Promise((resolve, reject) => {
            const exponentiation = new Exponentiation(base, exponent);
            exponentiation.run();
            const intervalId = setInterval(() => {
                if (exponentiation.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(exponentiation.getResult());
                }
            }, 200);
        });
    }
    runDivision(numerator, denominator) {
        return new Promise((resolve, reject) => {
            const division = new Division(numerator, denominator);
            division.run();
            const intervalId = setInterval(() => {
                if (division.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(division.getResult());
                }
            }, 200);
        });
    }
    getResult() {
        return this.result;
    }
}
