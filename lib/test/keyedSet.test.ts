import { KeyedSet } from "../keyedSet";
import { createKeyedItem } from "../keyedItem";

type FakeEdge = {
  a: string;
  b: string;
  key: string;
};

function createFakeEdge(a: string, b: string): FakeEdge {
  return createKeyedItem({ a, b }, `${a}-${b}`);
}

const fakeEdges = [
  createFakeEdge("a", "b"),
  createFakeEdge("a", "c"),
  createFakeEdge("b", "d"),
];
const fakeEdgeSet = new KeyedSet(fakeEdges);
const fakeEdgeSetKeySet = new Set(fakeEdgeSet.keys);

describe("KeyedSet", () => {
  describe("get values", () => {
    const { values } = fakeEdgeSet;
    test("should provide initial values", () => {
      expect(values).toHaveLength(fakeEdges.length);
      fakeEdges.forEach((edge, index) => {
        expect(values[index]).toMatchObject(edge);
      });
    });
  });

  describe("get keys", () => {
    const { keys } = fakeEdgeSet;

    test("should provide keys for initial values", () => {
      expect(keys).toHaveLength(fakeEdges.length);
      fakeEdges.forEach((edge, index) => {
        expect(keys[index]).toMatchObject(edge.key);
      });
    });
  });

  describe("get size", () => {
    test("should provide count of initial values", () => {
      expect(fakeEdgeSet.size).toEqual(fakeEdges.length);
    });
  });

  describe("has", () => {
    test("should return true when in set", () => {
      expect(fakeEdgeSet.has(createFakeEdge("a", "c"))).toBeTruthy();
    });

    test("should return false when not in set", () => {
      expect(fakeEdgeSet.has(createFakeEdge("b", "c"))).toBeFalsy();
    });
  });

  describe("getValue", () => {
    test("should return value in set via key", () => {
      const value = fakeEdgeSet.getValue(fakeEdges[0].key);
      expect(value).toMatchObject(fakeEdges[0]);
    });

    test("should return undefined when value not in set", () => {
      const edgeNotInSet = createFakeEdge("y", "z");
      const value = fakeEdgeSet.getValue(edgeNotInSet.key);
      expect(value).toBeUndefined();
    });
  });

  const otherEdges = [
    createFakeEdge("a", "c"),
    createFakeEdge("b", "c"),
    createFakeEdge("d", "e"),
  ];
  const otherEdgeSet = new KeyedSet(otherEdges);

  describe("set operations", () => {
    test("should return union of sets", () => {
      /**
       * fakeEdgeSet  otherEdgeSet   union(fake, other)
       *    a-b                       a-b
       *    a-c         a-c           a-c
       *                b-c           b-c
       *    b-d                       b-d
       *                d-e           d-e
       */
      const union = fakeEdgeSet.union(otherEdgeSet);

      expect(union.size).toEqual(5);
      [...fakeEdges, ...otherEdges].forEach((edge) => {
        expect(union.has(edge)).toBeTruthy();
      });
    });

    test("should return intersection of sets", () => {
      /**
       * fakeEdgeSet  otherEdgeSet   intersection(fake, other)
       *    a-b
       *    a-c         a-c           a-c
       *                b-c
       *    b-d
       *                d-e
       */
      const intersection = fakeEdgeSet.intersection(otherEdgeSet);
      expect(intersection.size).toEqual(1);
      expect(intersection.has(createFakeEdge("a", "c"))).toBeTruthy();
    });

    test("should return set difference", () => {
      /**
       * fakeEdgeSet  otherEdgeSet   set diff(fake, other)
       *    a-b
       *    a-c         a-c
       *                b-c           b-c
       *    b-d
       *                d-e           d-e
       */
      const setDiff = fakeEdgeSet.setDiff(otherEdgeSet);
      expect(setDiff.size).toEqual(2);
      [createFakeEdge("b", "c"), createFakeEdge("d", "e")].forEach((edge) => {
        expect(setDiff.has(edge)).toBeTruthy();
      });
    });

    test("should return symmetric difference", () => {
      /**
       * fakeEdgeSet  otherEdgeSet   symmetric diff(fake, other)
       *    a-b                       a-b
       *    a-c         a-c
       *                b-c           b-c
       *    b-d                       b-d
       *                d-e           d-e
       */
      const setDiff = fakeEdgeSet.symmetricDiff(otherEdgeSet);
      expect(setDiff.size).toEqual(4);
      [
        createFakeEdge("a", "b"),
        createFakeEdge("b", "c"),
        createFakeEdge("b", "d"),
        createFakeEdge("d", "e"),
      ].forEach((edge) => {
        expect(setDiff.has(edge)).toBeTruthy();
      });
    });
  });

  describe("isSubsetOf", () => {
    test("should return true when subset", () => {
      const union = fakeEdgeSet.union(otherEdgeSet);
      expect(fakeEdgeSet.isSubsetOf(union)).toBeTruthy();
    });

    test("should return true when same set", () => {
      expect(fakeEdgeSet.isSubsetOf(fakeEdgeSet)).toBeTruthy();
    });

    test("should return false when not subset", () => {
      const union = fakeEdgeSet.union(otherEdgeSet);
      expect(union.isSubsetOf(fakeEdgeSet)).toBeFalsy();
    });
  });

  describe("isSupersetOf", () => {
    test("should return true when superset", () => {
      const union = fakeEdgeSet.union(otherEdgeSet);
      expect(union.isSupersetOf(fakeEdgeSet)).toBeTruthy();
    });

    test("should return true when same set", () => {
      expect(fakeEdgeSet.isSupersetOf(fakeEdgeSet)).toBeTruthy();
    });

    test("should return false when not superset", () => {
      const union = fakeEdgeSet.union(otherEdgeSet);
      expect(fakeEdgeSet.isSupersetOf(union)).toBeFalsy();
    });
  });

  describe("clone", () => {
    const clone = fakeEdgeSet.clone();
    test("should return different instance", () => {
      expect(clone).not.toBe(fakeEdgeSet);
    });

    test("should new instance with same values", () => {
      expect(clone.size).toEqual(fakeEdgeSet.size);

      const cloneKeySet = new Set(clone.keys);
      fakeEdgeSet.values.forEach((edge) => {
        expect(cloneKeySet.has(edge.key)).toBeTruthy();
      });

      clone.values.forEach((edge) => {
        expect(fakeEdgeSetKeySet.has(edge.key)).toBeTruthy();
      });
    });
  });

  describe("mutation operations", () => {
    let set = fakeEdgeSet.clone();
    beforeEach(() => {
      set = fakeEdgeSet.clone();
    });

    describe("add", () => {
      test("should add item not yet in set", () => {
        const addition = createFakeEdge("e", "f");
        set.add(addition);

        const postOpKeySet = new Set(set.keys);
        expect(set.size).toBeGreaterThan(fakeEdgeSet.size);
        expect(fakeEdgeSetKeySet.has(addition.key)).toBeFalsy();
        expect(postOpKeySet.has(addition.key)).toBeTruthy();
      });

      test("should add item already in set", () => {
        const addition = createFakeEdge("a", "b");
        set.add(addition);
        const postOpKeySet = new Set(set.keys);

        expect(set.size).toEqual(fakeEdgeSet.size);
        expect(fakeEdgeSetKeySet.has(addition.key)).toBeTruthy();
        expect(postOpKeySet.has(addition.key)).toBeTruthy();
      });
    });

    describe("delete", () => {
      test("should delete single existing value", () => {
        const removed = createFakeEdge("a", "b");
        set.delete(removed);
        const postOpKeySet = new Set(set.keys);

        expect(postOpKeySet.size).toBeLessThan(fakeEdges.length);
        expect(postOpKeySet.has(removed.key)).toBeFalsy();
      });

      test("should delete multiple existing value", () => {
        const removed = [createFakeEdge("a", "b"), createFakeEdge("b", "c")];
        set.delete(removed);
        const postOpKeySet = new Set(set.keys);

        expect(postOpKeySet.size).toBeLessThan(fakeEdges.length);
        removed.forEach((edge) => {
          expect(postOpKeySet.has(edge.key)).toBeFalsy();
        });
      });

      test("should make no change when value not in set", () => {
        const removed = createFakeEdge("e", "f");
        set.delete(removed);
        const postOpKeySet = new Set(set.keys);

        expect(postOpKeySet.size).toEqual(fakeEdges.length);
        expect(postOpKeySet.has(removed.key)).toBeFalsy();
      });
    });

    describe("clear", () => {
      test("should remove all values", () => {
        set.clear();
        expect(set.keys).toHaveLength(0);
      });
    });
  });
});
