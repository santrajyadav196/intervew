function firstOccurrenceBrute(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // first match — return immediately
    }
  }
  return -1;
}

function firstOccurrence(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let result = -1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      result = mid;
      end = mid - 1; // FIXED
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
}

console.log(firstOccurrence([2, 4, 4, 4, 6, 7, 9], 4)); // 1
