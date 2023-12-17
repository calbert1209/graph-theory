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
      console.log("pushing: ", prefix.join(","));
      target.push(prefix);
      return;
    }
    console.log(`prefix: ${prefix.join(",")}, options: [${options.join(",")}]`);

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const remainder = onPick(options, i);
      console.log("remainder: ", remainder.join(","));
      const result = [...prefix, option];

      this.permutateRecursively(result, remainder, length, target, onPick);
    }
  }

  public permutate(length: number, pickOne = false): T[][] {
    const output: T[][] = [];

    const onPick = pickOne
      ? (options: T[], index: number) => {
          const nextOptions = [...options];
          nextOptions.splice(index, 1);
          return nextOptions;
        }
      : (options: T[]) => [...options];
    const prefix: T[] = [];
    this.permutateRecursively(prefix, this.list, length, output, onPick);

    return output;
  }
}
