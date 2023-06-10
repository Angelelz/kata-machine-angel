type Node<T> = {
  value: T;
  next?: Node<T>;
};
export default class Stack<T> {
  public length: number;

  private head?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
  }

  push(item: T): void {
    const node = {
      value: item,
      next: this.head,
    };
    this.length++;
    this.head = node;
  }
  pop(): T | undefined {
    if (!this.head) return;
    this.length--;
    const node = this.head;
    this.head = this.head.next;
    return node.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
