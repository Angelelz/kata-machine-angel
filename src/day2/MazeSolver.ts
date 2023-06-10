const newPoint = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const mazeAt = (maze: string[], point: Point) => {
  return maze[point.y][point.x];
};
const isOutside = (maze: string[], point: Point): boolean => {
  return (
    point.y > maze.length - 1 ||
    point.y < 0 ||
    point.x > maze[0].length - 1 ||
    point.x < 0
  );
};
const walk = (
  maze: string[],
  wall: string,
  currPoint: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
) => {
  if (isOutside(maze, currPoint)) return false;

  if (mazeAt(maze, currPoint) === wall) return false;

  if (seen[currPoint.y][currPoint.x]) return false;

  if (currPoint.x === end.x && currPoint.y === end.y) {
    path.push(end);
    return true;
  }

  seen[currPoint.y][currPoint.x] = true;
  path.push(currPoint);

  for (let i = 0; i < newPoint.length; ++i) {
    if (
      walk(
        maze,
        wall,
        {
          x: currPoint.x + newPoint[i][0],
          y: currPoint.y + newPoint[i][1],
        },
        end,
        seen,
        path,
      )
    ) {
      return true;
    }
  }

  path.pop();
  return false;
};
export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);
  return path;
}
