export default class ArrayList<T> {
  public length: number;

  private arrayList: Record<number, T>;

  constructor(n: number = 0) {
    this.length = 0;
    this.arrayList = {};
  }
  private moveAheadFromEndTo(idx: number = 0): void {
    if (idx < 0 || idx > this.length) {
      throw new Error(
        `attempted to insert at ${idx} on array of length=${this.length}`,
      );
    }

    for (let i = this.length; i > idx; --i) {
      this.arrayList[i] = this.arrayList[i - 1];
    }
  }

  private moveBackTo(idx: number = 0): void {
    if (idx < 0 || idx > this.length) {
      throw new Error(
        `attempted to insert at ${idx} on array of length=${this.length}`,
      );
    }

    for (let i = idx; i < this.length - 1; ++i) {
      this.arrayList[i] = this.arrayList[i + 1];
    }

    this.length--;
    delete this.arrayList[this.length];
  }

  prepend(item: T): void {
    this.moveAheadFromEndTo();

    this.length++;
    this.arrayList[0] = item;
  }
  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      throw new Error(
        `attempted to insert at ${idx} on array of length=${this.length}`,
      );
    }
    if (idx === 0) return this.prepend(item);
    if (idx === this.length) return this.append(item);
    this.length++;

    this.moveAheadFromEndTo(idx);

    this.arrayList[idx] = item;
  }
  append(item: T): void {
    this.arrayList[this.length] = item;
    this.length++;
  }
  remove(item: T): T | undefined {
    let idx: number | undefined = undefined;

    for (let i = 0; i < this.length; ++i) {
      if (this.arrayList[i] === item) {
        idx = i;
        break;
      }
    }

    if (typeof idx === "undefined") return;

    return this.removeAt(idx);
  }
  get(idx: number): T | undefined {
    return this.arrayList[idx];
  }
  removeAt(idx: number): T | undefined {
    const value = this.get(idx);
    this.moveBackTo(idx);
    return value;
  }
}
