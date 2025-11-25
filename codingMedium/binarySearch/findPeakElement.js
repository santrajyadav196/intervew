function findPeakElement(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] < arr[mid + 1]) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return start;
}

console.log(findPeakElement([1, 3, 5, 7, 6, 4, 2])); // 3
console.log(findPeakElement([0, 2, 4, 3, 1])); // 2
