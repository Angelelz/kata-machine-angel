type Node<T> = {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;
};
export default class DoublyLinkedList<T> {
  public length: number;

  private head: Node<T> | null;
  private tail: Node<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  prepend(item: T): void {
    this.length++;

    const node: Node<T> = {
      value: item,
      next: this.head,
      prev: null,
    };

    this.head = node;
    if (this.length === 1) this.tail = node;
  }
  insertAt(item: T, idx: number): void {
    if (idx > this.length || idx < 0) return;

    let next = this.head;
    for (let i = 0; i < idx; ++i) {
      next = next!.next;
    }

    const node: Node<T> = {
      value: item,
      next: next?.next ?? null,
      prev: next?.prev ?? null,
    };

    this.length++;

    if (idx === 0) this.head = node;

    if (idx === this.length) this.tail = node;

    if (next?.prev) next.prev.next = node;

    if (next?.next) next.next.prev = node;
  }
  append(item: T): void {
    const tail = this.tail;
    this.tail = {
      value: item,
      next: null,
      prev: tail ?? null,
    };

    if (tail) tail.next = this.tail;

    if (!this.head) this.head = this.tail;

    if (this.length === 1) this.head.next = this.tail;

    this.length++;
  }
  remove(item: T): T | undefined {
    let node = this.head;
    if (!node) return;

    while (true) {
      if (node?.value === item || !node) break;
      node = node.next;
    }

    if (!node) return;

    this.length--;

    if (node === this.head) this.head = node.next;

    if (node.prev) node.prev.next = node.next;

    if (node.next) node.next.prev = node.prev;

    return node.value;
  }
  get(idx: number): T | undefined {
    if (idx > this.length - 1 || idx < 0) return;
    let node = this.head;

    for (let i = 0; i < idx; ++i) {
      node = node?.next ?? null;
    }

    return node?.value;
  }
  removeAt(idx: number): T | undefined {
    if (idx > this.length - 1 || idx < 0) return;
    if (idx === 0) {
      if (this.head) {
        const val = this.head.value;
        this.head = this.head.next;
        if (this.head?.next) this.head.next.prev = this.head;
        this.length--;
        return val;
      }
    }
    let node = this.head;

    for (let i = 0; i < idx; ++i) {
      node = node?.next ?? null;
    }

    if (!node) return;

    this.length--;

    if (node?.prev) node.prev.next = node.next;

    if (node?.next) node.next.prev = node.prev;

    return node?.value;
  }
}
