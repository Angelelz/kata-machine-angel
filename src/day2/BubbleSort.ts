export default function bubble_sort(arr: number[]): void {
  const length = arr.length;
  for (let i = 0; i < length; ++i) {
    for (let j = 0; j < length - 1 - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}
