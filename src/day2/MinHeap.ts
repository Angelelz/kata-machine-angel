import ArrayList from "./ArrayList";

export default class MinHeap {
  get length(): number {
    return this.data.length;
  }

  data: Array<number>;

  constructor() {
    this.data = [];
  }

  insert(value: number): void {
    let idx = this.length;
    this.data.push(value);

    while (value < this.parentValue(idx)) {
      const parentIndex = this.parentIndex(idx);
      this.swap(idx, parentIndex);
      idx = parentIndex;
    }
  }
  delete(): number {
    this.swap(this.length - 1, 0);
    const value = this.data.pop();
    const curr = this.data[0];
    let idx = 0;

    while (
      idx < this.length &&
      (curr > this.leftValue(idx) || curr > this.rightValue(idx))
    ) {
      if (this.leftIndex(idx) >= this.length) break;

      if (this.rightValue(idx) < this.leftValue(idx)) {
        const rightIndex = this.rightIndex(idx);
        this.swap(idx, rightIndex);
        idx = rightIndex;
      } else {
        const leftIndex = this.leftIndex(idx);
        this.swap(idx, leftIndex);
        idx = leftIndex;
      }
    }
    return value!;
  }

  parentIndex(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  parentValue(idx: number) {
    return this.data[this.parentIndex(idx)];
  }

  leftIndex(idx: number) {
    return idx * 2 + 1;
  }

  rightIndex(idx: number) {
    return idx * 2 + 2;
  }

  leftValue(idx: number) {
    return this.data[this.leftIndex(idx)];
  }

  rightValue(idx: number) {
    return this.data[this.rightIndex(idx)];
  }

  swap(from: number, to: number) {
    const tmp = this.data[from];
    this.data[from] = this.data[to];
    this.data[to] = tmp;
  }
}
