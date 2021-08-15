import {CPUBench} from "./cpu-bench/cpu-bench";

export class Test {
  static main(): void {
    console.log("Hello, World!");
    console.log(CPUBench(5));
  }
}

Test.main();