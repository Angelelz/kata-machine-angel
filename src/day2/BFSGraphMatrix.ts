import Queue from "./Queue";

export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  const seen: boolean[] = new Array<boolean>(graph.length).fill(false);
  const prev: number[] = new Array<number>(graph.length).fill(-1);

  seen[source] = true;

  const queue = new Queue<number>();
  queue.enqueue(source);

  while (queue.length) {
    const curr = queue.deque();

    if (typeof curr === "undefined") continue;

    if (curr === needle) {
      break;
    }
    for (let i = 0; i < graph.length; ++i) {
      // const child = i;
      const weigth = graph[curr][i];
      if (weigth === 0) continue;
      if (seen[i]) continue;

      seen[i] = true;
      prev[i] = curr;

      queue.enqueue(i);
    }
  }

  // build the path

  if (prev[needle] === -1) return null;
  let curr = needle;
  const out: number[] = [];

  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  return [source].concat(out.reverse());
}
