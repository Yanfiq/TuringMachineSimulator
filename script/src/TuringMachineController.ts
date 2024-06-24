import { Addition } from "./Addition.js";
import { Exponentiation } from "./Exponentiation.js";
import { Division } from "./Division.js";

export class TuringMachineController {
    private m: number;
    private n: number;
    private a: number;
    private b: number;
    private result: number | undefined;
    private intervalDuration: number = 500;
    private addition?: Addition;
    private exponentiation?: Exponentiation;
    private division?: Division;

    constructor(m: number, n: number, a: number, b: number) {
        this.m = m;
        this.n = n;
        this.a = a;
        this.b = b;
    }

    setIntervalDuration(duration: number) {
        console.log(duration);
        this.intervalDuration = duration;
        if(this.addition !== undefined && this.addition?.getResult() === undefined){
            this.addition.stop();
            this.addition.run(this.intervalDuration);
        }else if(this.exponentiation !== undefined && this.exponentiation?.getResult() === undefined){
            this.exponentiation.stop()
            this.exponentiation.run(this.intervalDuration);
        }else if(this.division !== undefined && this.division?.getResult() === undefined){
            this.division.stop()
            this.division.run(this.intervalDuration);
        }
    }

    getIntervalDuration(): number{
        return this.intervalDuration;
    }

    async run() {
        try {
            const additionResult = await this.runAddition(this.m, this.n);
            const exponentiationResult = await this.runExponentiation(additionResult, this.a);
            const divisionResult = await this.runDivision(exponentiationResult, this.b);
            this.result = divisionResult;
            alert('The result is '+this.result);
        } catch (error) {
            console.error("Error running the Turing machines:", error);
        }
    }

    private runAddition(m: number, n: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.addition = new Addition(m, n);
            this.addition.run(this.intervalDuration);
            const intervalId = setInterval(() => {
                if (this.addition?.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(this.addition.getResult() as number);
                }
            }, this.intervalDuration);
        });
    }

    private runExponentiation(base: number, exponent: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.exponentiation = new Exponentiation(base, exponent);
            this.exponentiation.run(this.intervalDuration);
            const intervalId = setInterval(() => {
                if (this.exponentiation?.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(this.exponentiation.getResult() as number);
                }
            }, this.intervalDuration);
        });
    }

    private runDivision(numerator: number, denominator: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.division = new Division(numerator, denominator);
            this.division.run(this.intervalDuration);
            const intervalId = setInterval(() => {
                if (this.division?.getResult() !== undefined) {
                    clearInterval(intervalId);
                    resolve(this.division.getResult() as number);
                }
            }, this.intervalDuration);
        });
    }

    getResult(): number | undefined {
        return this.result;
    }
}
