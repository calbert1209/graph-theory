import { KeyedSet } from "../keyedSet";
import { permutateAllEdges } from "../permutateEdges";
import { SimpleVertex } from "../simpleVertexEdge";

describe("permutateAllEdges", () => {
  const vertices = [1, 2, 3, 4].map((x) => new SimpleVertex(x));
  const vertexSet = new KeyedSet<SimpleVertex>(vertices);
  const output = permutateAllEdges(vertexSet);
  const outputKeySet = new Set(output.keys);

  test("result should have complete count", () => {
    expect(output.size).toEqual(6);
  });
  test("result should have complete list", () => {
    ["1-2", "1-3", "1-4", "2-3", "2-4", "3-4"].forEach((expectedKey) => {
      expect(outputKeySet.has(expectedKey)).toBeTruthy();
    });
  });
});
