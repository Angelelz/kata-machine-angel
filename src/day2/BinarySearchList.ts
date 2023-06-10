export default function bs_list(haystack: number[], needle: number): boolean {
  let high = haystack.length,
    low = 0;
  let mid = Math.floor(high / 2);
  while (low < high) {
    if (haystack[mid] === needle) {
      return true;
    } else if (haystack[mid] > needle) {
      high = mid;
    } else {
      low = mid + 1;
    }
    mid = Math.floor(low + (high - low) / 2);
  }
  return false;
}
