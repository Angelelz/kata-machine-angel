type Node<T> = {
  value: T;
  next: Node<T> | null;
};
export default class SinglyLinkedList<T> {
  public length: number;

  private head: Node<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
  }

  prepend(item: T): void {
    this.length++;
    const curr: Node<T> = {
      value: item,
      next: this.head,
    };
    this.head = curr;
  }
  insertAt(item: T, idx: number): void {
    if (idx > this.length - 1 || idx < 0) return;
    let next = this.head;
    let prev = null;
    for (let i = 0; i < idx; ++i) {
      prev = next;
      next = next!.next!;
    }
    const node = {
      value: item,
      next,
    };
    this.length++;
    if (!prev) {
      this.head = node;
      return;
    }
    prev.next = node;
  }
  append(item: T): void {
    if (this.length === 0) {
      this.head = {
        value: item,
        next: null,
      };
      ++this.length;
      return;
    }
    let prev = null;
    let next = this.head;
    while (true) {
      if (next === null) break;
      prev = next;
      next = next.next;
    }
    const node = {
      value: item,
      next: null,
    };
    this.length++;
    if (prev) prev.next = node;
  }
  remove(item: T): T | undefined {
    let next = this.head;
    let prev = null;
    if (!next) return;
    while (true) {
      if (next === null || next.value === item) break;
      prev = next;
      next = next.next;
    }
    if (!next) return;
    this.length--;
    if (prev) {
      prev.next = next.next;
    } else {
      this.head = next.next;
    }
    return next.value;
  }
  get(idx: number): T | undefined {
    if (idx > this.length - 1 || idx < 0) return;
    if (idx === 0) return this.head?.value;
    let next = this.head;
    for (let i = 0; i < idx; ++i) {
      next = next?.next ?? null;
    }
    return next?.value;
  }
  removeAt(idx: number): T | undefined {
    if (idx > this.length - 1 || idx < 0) return;
    let prev = null;
    let next = this.head;
    for (let i = 0; i < idx; ++i) {
      prev = next;
      next = next!.next!;
    }
    this.length--;
    if (prev) {
      prev.next = next?.next ?? null;
    } else if (this.head) {
      this.head = this.head.next;
    }
    return next?.value;
  }
}
