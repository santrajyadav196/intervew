function peakIndexInMountainArray(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] < arr[mid + 1]) {
      // We are on the left side → go right
      start = mid + 1;
    } else {
      // We are on the right side → go left (mid could be peak)
      end = mid;
    }
  }

  return start; // or end (both same at peak)
}

console.log(peakIndexInMountainArray([1, 3, 5, 7, 6, 4, 2])); // 3
console.log(peakIndexInMountainArray([0, 2, 4, 3, 1])); // 2
