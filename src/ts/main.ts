import {cpuBench} from "cpu-bench";

export class Test {
  static main(): void {
    console.log("Hello, World!");
    console.log(cpuBench());
  }
}

Test.main();