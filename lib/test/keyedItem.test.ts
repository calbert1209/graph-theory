import { describe, test, expect } from "vitest";
import { createKeyedItem } from "../keyedItem";

describe(createKeyedItem.name, () => {
  test("should create keyed item when given static key", () => {
    const staticKey = "one-dozen";
    const result = createKeyedItem({ value: 12 }, staticKey);
    expect(result).toMatchObject({
      value: 12,
      key: staticKey,
    });
  });

  test("should create keyed item when given key deriving function", () => {
    const result = createKeyedItem({ value: 12 }, (item) =>
      item.value.toString(16).padStart(2, "0")
    );
    expect(result).toMatchObject({
      value: 12,
      key: "0c",
    });
  });
});
