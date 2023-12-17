export class Permutator<T> {
  constructor(public readonly list: T[]) {}

  private permutateRecursively(
    prefix: T[],
    options: T[],
    length: number,
    target: T[][],
    onPick: (options: T[], index: number) => T[]
  ) {
    if (prefix.length === length) {
      target.push(prefix);
      return;
    }

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const remainder = onPick(options, i);
      const result = [...prefix, option];

      this.permutateRecursively(result, remainder, length, target, onPick);
    }
  }

  public permutate(length: number, multiPick = false): T[][] {
    const output: T[][] = [];

    const onPick = multiPick
      ? (options: T[]) => [...options]
      : (options: T[], index: number) => {
          const nextOptions = [...options];
          nextOptions.splice(index, 1);
          return nextOptions;
        };
    const prefix: T[] = [];
    this.permutateRecursively(prefix, this.list, length, output, onPick);

    return output;
  }
}
