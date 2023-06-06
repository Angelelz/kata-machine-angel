type Node<T> = {
  value: T;
  next: Node<T> | null;
};
export default class Queue<T> {
  public length: number = 0;

  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  constructor() {}

  enqueue(item: T): void {
    const node: Node<T> = {
      value: item,
      next: null,
    };
    this.length++;
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    if (this.head === this.tail) {
      this.head.next = node;
      this.tail = node;
      return;
    }
    this.tail!.next = node;
    this.tail = node;
  }
  deque(): T | undefined {
    if (!this.head) return;
    this.length--;
    const head = this.head;
    this.head = this.head?.next;
    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
