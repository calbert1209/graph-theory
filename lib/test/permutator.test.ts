import { Permutator } from "../permutator";
import { ALL_WITHOUT_RE_PICK, ALL_WITH_RE_PICK } from "./permutation-example";

const seedList = [1, 2, 3, 4];
const p = new Permutator(seedList);
const multiPickKeySet = new Set(ALL_WITH_RE_PICK.map((p) => p.join(",")));
const singlePickKeySet = new Set(ALL_WITHOUT_RE_PICK.map((p) => p.join(",")));

describe("Permutator", () => {
  test("constructor", () => {
    expect(p.list).toHaveLength(seedList.length);
    seedList.forEach((item, index) => {
      expect(p.list[index]).toEqual(item);
    });
  });

  test("permutate with multi-pick", () => {
    const output = p.permutate(4, true);

    expect(output).toHaveLength(multiPickKeySet.size);
    output.forEach((permutation) => {
      const key = permutation.join(",");
      expect(multiPickKeySet.has(key)).toBeTruthy();
    });
  });

  test("permutate with single pick", () => {
    const output = p.permutate(4, false);

    expect(output).toHaveLength(singlePickKeySet.size);
    output.forEach((permutation) => {
      const key = permutation.join(",");
      expect(singlePickKeySet.has(key)).toBeTruthy();
    });
  });
});
