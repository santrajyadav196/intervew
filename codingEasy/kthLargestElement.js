function kthLargestElement(arr, k) {
  let sortedArr = arr.sort((a, b) => a - b);
  return sortedArr[arr.length - k];
}

// example
console.log(kthLargestElement([3, 2, 1, 5, 6, 4], 2));
