import * as workerThread from "worker_threads";

/*
import * as events from "events";
import * as os from "os";

const eventEmitter = new events.EventEmitter();
eventEmitter.on('done', done);

const cpuCount = os.cpus().length;


function done(arg: number) {
  console.log("done by", arg);
}
*/

export interface LineerBody {
  start: number;
  end: number;
}

function fitnessFunction(x: number): number {
  return Math.pow(Math.sin(5 * Math.PI * x) / ((x + 13) * (7 + Math.sqrt(x ** 3))), 6) * x;
}

function lineerFunction(pos: number): number {
  const x = pos * 0.001;
  return fitnessFunction(x);
}

function solve(start: number, end: number): number {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += lineerFunction(i);
  }
  // eventEmitter.emit('done', sum);
  return sum;
}

workerThread.parentPort?.on("message", (body: LineerBody) => {
  const value = solve(body.start, body.end);
  workerThread.parentPort?.postMessage(value);
});