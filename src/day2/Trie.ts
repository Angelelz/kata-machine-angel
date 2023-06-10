type TrieNode = {
  children: (TrieNode | undefined)[];
  letter: string;
  isWord: boolean;
};

function emptyArr() {
  return new Array().fill(undefined, 0, 26);
}

export default class Trie {
  root: TrieNode;
  constructor() {
    const root: TrieNode = {
      children: emptyArr(),
      letter: "",
      isWord: false,
    };
    this.root = root;
  }

  insert(item: string): void {
    let curr = this.root;

    for (let c of item) {
      const idx = this.idx(c);
      const child = curr.children[idx];

      if (child) {
        curr = child;
      } else {
        const node: TrieNode = {
          children: emptyArr(),
          letter: c,
          isWord: false,
        };

        curr.children[idx] = node;
        curr = node;
      }
    }

    curr.isWord = true;
  }

  delete(item: string): void {
    this.walkDown(this.root, item, -1);
  }

  walkDown(node: TrieNode | undefined, item: string, i: number) {
    if (!node) {
      return;
    }

    if (i === item.length - 1) {
      node.isWord = false;
      return;
    }

    const nextIdx = this.idx(item[i + 1]);
    const child = node.children[nextIdx];

    this.walkDown(child, item, i + 1);

    if (child?.children.length === 0 && !child.isWord) {
      node.children[nextIdx] = undefined;
    }
  }

  find(partial: string): string[] {
    let initialNode: TrieNode | undefined = this.root;

    for (let c of partial) {
      initialNode = initialNode?.children[this.idx(c)];
    }

    if (!initialNode) return [];

    const out: string[] = [];

    this.dfs(initialNode, out, partial);
    console.log(out);

    return out;
  }
  private dfs(node: TrieNode | undefined, arr: string[], str: string) {
    if (!node) return;

    for (let i = 0; i < 26; ++i) {
      const newNode = node.children[i];
      const c = newNode?.letter;
      if (!c) continue;

      if (newNode.isWord) arr.push(str + c);

      this.dfs(newNode, arr, str + c);
    }
  }
  private idx(str: string): number {
    const zero = "a".charCodeAt(0);

    return str.charCodeAt(0) - zero;
  }
}
