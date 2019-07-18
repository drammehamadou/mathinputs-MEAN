export function range(from: number, to: number): Array<number> {
  return Array.from(Array(to - from), (x, i) => from + i);
}
