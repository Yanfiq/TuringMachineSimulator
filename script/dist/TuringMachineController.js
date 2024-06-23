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
        this.intervalDuration = 200;
        this.m = m;
        this.n = n;
        this.a = a;
        this.b = b;
    }
    setIntervalDuration(duration) {
        var _a, _b, _c;
        console.log(duration);
        this.intervalDuration = duration;
        if (this.addition !== undefined && ((_a = this.addition) === null || _a === void 0 ? void 0 : _a.getResult()) === undefined) {
            this.addition.stop();
            this.addition.run(this.intervalDuration);
        }
        else if (this.exponentiation !== undefined && ((_b = this.exponentiation) === null || _b === void 0 ? void 0 : _b.getResult()) === undefined) {
            this.exponentiation.stop();
            this.exponentiation.run(this.intervalDuration);
        }
        else if (this.division !== undefined && ((_c = this.division) === null || _c === void 0 ? void 0 : _c.getResult()) === undefined) {
            this.division.stop();
            this.division.run(this.intervalDuration);
        }
    }
    getIntervalDuration() {
        return this.intervalDuration;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const additionResult = yield this.runAddition(this.m, this.n);
                const exponentiationResult = yield this.runExponentiation(additionResult, this.a);
                const divisionResult = yield this.runDivision(exponentiationResult, this.b);
                this.result = divisionResult;
                alert('The result is ' + this.result);
            }
            catch (error) {
                console.error("Error running the Turing machines:", error);
            }
        });
    }
    runAddition(m, n) {
        return new Promise((resolve, reject) => {
            this.addition = new Addition(m, n);
            this.addition.run(this.intervalDuration);
            const intervalId = setInterval(() => {
                var _a;
                if (((_a = this.addition) === null || _a === void 0 ? void 0 : _a.getResult()) !== undefined) {
                    clearInterval(intervalId);
                    resolve(this.addition.getResult());
                }
            }, this.intervalDuration);
        });
    }
    runExponentiation(base, exponent) {
        return new Promise((resolve, reject) => {
            this.exponentiation = new Exponentiation(base, exponent);
            this.exponentiation.run(this.intervalDuration);
            const intervalId = setInterval(() => {
                var _a;
                if (((_a = this.exponentiation) === null || _a === void 0 ? void 0 : _a.getResult()) !== undefined) {
                    clearInterval(intervalId);
                    resolve(this.exponentiation.getResult());
                }
            }, this.intervalDuration);
        });
    }
    runDivision(numerator, denominator) {
        return new Promise((resolve, reject) => {
            this.division = new Division(numerator, denominator);
            this.division.run(this.intervalDuration);
            const intervalId = setInterval(() => {
                var _a;
                if (((_a = this.division) === null || _a === void 0 ? void 0 : _a.getResult()) !== undefined) {
                    clearInterval(intervalId);
                    resolve(this.division.getResult());
                }
            }, this.intervalDuration);
        });
    }
    getResult() {
        return this.result;
    }
}
