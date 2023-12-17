import { KeyedItem } from "./keyedItem";

export class SimpleVertex implements KeyedItem {
  public key: string;
  constructor(public readonly id: number) {
    this.key = id.toString();
  }
}

export class SimpleEdge implements KeyedItem {
  private constructor(
    public readonly a: SimpleVertex,
    public readonly b: SimpleVertex
  ) {}

  get key() {
    return `${this.a.key}-${this.b.key}`;
  }

  public static create(a: SimpleVertex, b: SimpleVertex) {
    if (a.id === b.id) {
      throw new Error("Invalid arguments, vertices have the same value");
    }

    const [min, max] = a.id < b.id ? [a, b] : [b, a];
    return new SimpleEdge(min, max);
  }
}
