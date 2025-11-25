function findFirstAndLastPositionOfElement(arr, target) {
  function findFirst() {
    let start = 0;
    let end = arr.length - 1;
    let startIndex = -1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid] === target) {
        startIndex = mid;
        end = mid - 1; // keep searching left
      } else if (arr[mid] > target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return startIndex;
  }
  function findLast() {
    let start = 0;
    let end = arr.length - 1;
    let lastIndex = -1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (arr[mid] === target) {
        lastIndex = mid;
        start = mid + 1; // keep searching for last element
      } else if (arr[mid] > target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return lastIndex;
  }

  return [findFirst(), findLast()];
}
console.log(findFirstAndLastPositionOfElement([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
console.log(findFirstAndLastPositionOfElement([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]
console.log(findFirstAndLastPositionOfElement([], 0)); // [-1, -1]
console.log(findFirstAndLastPositionOfElement([1, 2, 2, 2, 3], 2)); // [1, 3]
