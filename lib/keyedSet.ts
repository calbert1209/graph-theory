import type { KeyedItem } from "./keyedItem";

export class KeyedSet<T extends KeyedItem> {
  private valuesRecord: Record<string, T> = {};

  constructor(initialValues: T | T[]) {
    this.addValues(initialValues);
  }

  private addValues(values: T | T[]) {
    const valuesArray = Array.isArray(values) ? values : [values];
    for (const value of valuesArray) {
      this.valuesRecord[value.key] = value;
    }
  }

  public get values() {
    return [...Object.values(this.valuesRecord)];
  }

  public get keys() {
    return [...Object.keys(this.valuesRecord)];
  }

  public get size() {
    return Object.keys(this.valuesRecord).length;
  }

  public add(values: T | T[]) {
    this.addValues(values);
  }

  public delete(values: T | T[]) {
    const valuesArray = Array.isArray(values) ? values : [values];
    for (const value of valuesArray) {
      const key = value.key;
      delete this.valuesRecord[key];
    }
  }

  public clear() {
    this.valuesRecord = {};
  }

  public has(value: T) {
    return value.key in this.valuesRecord;
  }

  public union(other: KeyedSet<T>) {
    const unionValues = [...this.values, ...other.values];
    return new KeyedSet(unionValues);
  }

  public intersection(other: KeyedSet<T>) {
    const unionValues = [...this.values, ...other.values];
    const intersectionValues: T[] = [];
    for (const value of unionValues) {
      if (this.has(value) && other.has(value)) {
        intersectionValues.push(value);
      }
    }

    return new KeyedSet<T>(intersectionValues);
  }

  public setDiff(other: KeyedSet<T>) {
    const differenceValues: T[] = [];

    for (const value of other.values) {
      if (!this.has(value)) {
        differenceValues.push(value);
      }
    }

    return new KeyedSet<T>(differenceValues);
  }

  public symmetricDiff(other: KeyedSet<T>) {
    const unionValues = [...this.values, ...other.values];
    const symmetricDiffValues: T[] = [];
    for (const value of unionValues) {
      if (this.has(value) && other.has(value)) {
        continue;
      }
      symmetricDiffValues.push(value);
    }

    return new KeyedSet<T>(symmetricDiffValues);
  }

  public isSubsetOf(other: KeyedSet<T>) {
    if (this.size > other.size) return false;

    return Object.values(this.valuesRecord).every((value) => other.has(value));
  }

  public isSupersetOf(other: KeyedSet<T>) {
    if (this.size < other.size) return false;

    return Object.values(other.values).every((value) => this.has(value));
  }

  public clone() {
    return new KeyedSet<T>(this.values);
  }
}
