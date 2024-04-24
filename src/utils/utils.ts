function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

function delay(): Promise<void> {
  return new Promise<void>(res => setTimeout(res, 1500));
}

export { getRandomNumber, delay }
