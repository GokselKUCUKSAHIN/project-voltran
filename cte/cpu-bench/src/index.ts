import {Worker} from "worker_threads";
import {LineerBody} from "./lib/worker";

const taskPath = `${__dirname}/lib/worker.js`;

function runOnWorker(worker: Worker, body: LineerBody): Promise<number> {
  return new Promise(resolve => {
    worker.on('message', resolve);
    worker.postMessage(body);
  });
}

function executeWorkerPromise(taskPath: string, body: LineerBody): Promise<number> {
  return new Promise(async resolve => {
    const w = new Worker(taskPath);
    const value = await runOnWorker(w, body);
    const term = await w.terminate();
    resolve(value);
  });
}

function isPrime(candidate: number): boolean {
  if (candidate >= 2) {
    for (let i = 2, limit = Math.sqrt(candidate); i <= limit; i++) {
      if (candidate % i === 0) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function singleCoreLoad(load: number = 1_000_000): void {
  for (let i = 3; i < load; i += 2) {
    isPrime(i);
  }
}

function cpuSingleCoreScore(count: number = 1): number {
  const startTime = Date.now();
  for (let i = 0; i < count; i++) {
    singleCoreLoad();
  }
  const deltaTime = Date.now() - startTime;
  return 10_000_000 / deltaTime;
}

export function cpuSingleCoreBench(): number {
  return parseFloat(cpuSingleCoreScore(10).toFixed(4));
}

function sum(array: number[]): number {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

function multiCoreLoadPromiseArray(sampleSize: number, scaler: number): Promise<number>[] {
  const promiseArray: Promise<number>[] = Array(sampleSize);
  for (let i = 0; i < promiseArray.length; i++) {
    promiseArray[i] = executeWorkerPromise(taskPath, {start: i * scaler, end: (i + 1) * scaler});
  }
  return promiseArray;
}

async function multiCoreLoad(sampleSize: number = 512, scaler: number = 10_000): Promise<number> {
  const resultArray = await Promise.all(multiCoreLoadPromiseArray(sampleSize, scaler));
  return sum(resultArray);
}

async function cpuMultiCoreScore(count: number = 1): Promise<number> {
  const startTime = Date.now();
  for (let i = 0; i < count; i++) {
    await multiCoreLoad();
  }
  const deltaTime = Date.now() - startTime;
  return 100_000_000 / deltaTime;
}

export async function cpuMultiCoreBench(): Promise<number> {
  return parseFloat((await cpuMultiCoreScore(1)).toFixed(4));
}