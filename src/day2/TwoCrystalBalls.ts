export default function two_crystal_balls(breaks: boolean[]): number {
  const jump = Math.max(Math.floor(Math.sqrt(breaks.length)), 1);
  let i = jump;
  console.log(jump);
  for (; i < breaks.length; i += jump) {
    if (breaks[i]) break;
  }

  i -= jump;
  for (let j = 0; j < jump && i < breaks.length; ++j) {
    if (breaks[i + j]) {
      return i + j;
    }
  }

  return -1;
}
