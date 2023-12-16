export type KeyedItem = {
  readonly key: string;
};

export function createKeyedItem<T extends {}>(
  item: T,
  key: string | ((item: T) => string)
): T & KeyedItem {
  const derivedKey = typeof key === "string" ? key : key(item);
  return {
    key: derivedKey,
    ...item,
  };
}
