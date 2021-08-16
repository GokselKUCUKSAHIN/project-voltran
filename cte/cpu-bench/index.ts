function coreLoad(load: number = 99_000_000): void {
  let pi = 1;
  for (let i = 2; i < load; i += 2) {
    pi *= (i / (i - 1)) * (i / (i + 1));
  }
}

export function cpuScore(count: number = 1): number {
  const startTime = Date.now();
  for (let i = 0; i < count; i++) {
    coreLoad();
  }
  const deltaTime = Date.now() - startTime;
  return 10_000_000 / deltaTime;
}

export function cpuBench(): number {
  return parseFloat(cpuScore(10).toFixed(4));
}