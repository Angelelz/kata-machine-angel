export default class Map<T extends string | number, V> {
  map: Record<T, V>;
  length: number;

  constructor() {
    this.map = {} as Record<T, V>;
    this.length = 0;
  }

  get(key: T): V | undefined {
    return this.map[key];
  }
  set(key: T, value: V): void {
    const exists = this.map[key];

    this.map[key] = value;

    if (typeof exists === "undefined") {
      this.length++;
    }
  }
  delete(key: T): V | undefined {
    const exists = this.map[key];

    delete this.map[key];
    if (typeof exists !== "undefined") {
      this.length--;
    }

    return exists;
  }
  size(): number {
    return this.length;
  }
}
