import { KeyedSet } from "./keyedSet";
import { SimpleEdge, SimpleVertex } from "./simpleVertexEdge";

export function permutateAllEdges(vertices: KeyedSet<SimpleVertex>) {
  const edges: SimpleEdge[] = [];
  const { keys } = vertices;
  for (let i = 0; i < keys.length; i++) {
    const current = vertices.getValue(keys[i]);
    const otherKeys = [...keys].slice(i + 1);
    for (let j = 0; j < otherKeys.length; j++) {
      const other = vertices.getValue(otherKeys[j]);
      const edge = SimpleEdge.create(current, other);
      edges.push(edge);
    }
  }

  return new KeyedSet<SimpleEdge>(edges);
}
