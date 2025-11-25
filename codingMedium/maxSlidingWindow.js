function maxSlidingWindow(arr, k) {
  let result = [];

  for (let i = 0; i <= arr.length - k; i++) {
    let currMax = arr[i];
    for (let j = i; j < i + k; j++) {
      if (arr[j] > currMax) {
        currMax = arr[j];
      }
    }
    result.push(currMax);
  }
  return result;
}

function maxSlidingWindow(arr, k) {
  const deque = []; // stores indices
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    // Remove indices that are out of the window
    while (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove indices whose values are less than current
    while (deque.length && arr[deque[deque.length - 1]] < arr[i]) {
      deque.pop();
    }

    deque.push(i);

    // Window has reached size k
    if (i >= k - 1) {
      result.push(arr[deque[0]]); // max in current window
    }
  }

  return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // Expected output: [3,3,5,5,6,7]
