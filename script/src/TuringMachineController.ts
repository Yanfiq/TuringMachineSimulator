import { Addition } from "./Addition.js";
import { Exponentiation } from "./Exponentiation.js";
import { Division } from "./Division.js";

export class TuringMachineController {
    private m: number;
    private n: number;
    private a: number;
    private b: number;
    private result: number | undefined;

    constructor(m: number, n: number, a: number, b: number) {
        this.m = m;
        this.n = n;
        this.a = a;
        this.b = b;
    }

    async run() {
        try {
            const additionResult = await this.runAddition(this.m, this.n);
            const exponentiationResult = await this.runExponentiation(additionResult, this.a);
            const divisionResult = await this.runDivision(exponentiationResult, this.b);
            this.result = divisionResult;
            console.log(`Final Result: ${this.result}`);
        } catch (error) {
            console.error("Error running the Turing machines:", error);
        }
    }

    private runAddition(m: number, n: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const addition = new Addition(m, n);
            addition.run();
            const intervalId = setInterval(() => {
                if (addition.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(addition.getResult() as number);
                }
            }, 200);
        });
    }

    private runExponentiation(base: number, exponent: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const exponentiation = new Exponentiation(base, exponent);
            exponentiation.run();
            const intervalId = setInterval(() => {
                if (exponentiation.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(exponentiation.getResult() as number);
                }
            }, 200);
        });
    }

    private runDivision(numerator: number, denominator: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const division = new Division(numerator, denominator);
            division.run();
            const intervalId = setInterval(() => {
                if (division.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(division.getResult() as number);
                }
            }, 200);
        });
    }

    getResult(): number | undefined {
        return this.result;
    }
}
