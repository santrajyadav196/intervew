function lastOccurrenceBrute(arr, target) {
  let result = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      result = i; // keep updating (last match)
    }
  }

  return result;
}

function lastOccurrenceBruteRight(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === target) {
      return i; // first match from right is last occurrence
    }
  }
  return -1;
}

function lastOccurrence(arr, target) {
  let start = 0;
  let end = arr.length - 1;
  let result = -1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      result = mid;
      start = mid + 1;
    } else if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
}

console.log(lastOccurrence([2, 4, 4, 4, 6, 7, 9], 4)); // expected 3
