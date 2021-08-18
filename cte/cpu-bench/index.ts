function coreLoad(load: number = 99_000_000): void {
  let pi = 1;
  for (let i = 2; i < load; i += 2) {
    pi *= (i / (i - 1)) * (i / (i + 1));
  }
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

function coreLoadPrime(load: number = 1_000_000): void {
  for (let i = 3; i < load; i += 2) {
    isPrime(i);
  }
}

export function cpuScore(count: number = 1): number {
  const startTime = Date.now();
  for (let i = 0; i < count; i++) {
    // coreLoad();
    coreLoadPrime();
  }
  const deltaTime = Date.now() - startTime;
  return 10_000_000 / deltaTime;
}

export function cpuBench(): number {
  return parseFloat(cpuScore(10).toFixed(4));
}