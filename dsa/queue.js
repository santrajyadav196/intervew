// Queue => first in First out (FIFO)

function firstUniqCharQueue(s) {
  const freq = new Map(); // frequency map
  const queue = []; // store characters in order of arrival

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    // Update frequency

    if (freq.has(char)) {
      freq.set(char, freq.get(char) + 1);
    } else {
      freq.set(char, 1);
    }
    // freq.set(char, (freq.get(char) || 0) + 1);
    // Push index into queue
    queue.push(i);

    // Remove from queue if not unique
    while (queue.length > 0 && freq.get(s[queue[0]]) > 1) {
      queue.shift();
    }
  }

  return queue.length > 0 ? queue[0] : -1;
}

// Example usage
console.log(firstUniqCharQueue("leetcode")); // Output: 0
console.log(firstUniqCharQueue("loveleetcode")); // Output: 2
console.log(firstUniqCharQueue("aabb")); // Output: -1

function maxSlidingWindow(arr, k) {
  let output = [];

  for (let i = 0; i <= arr.length - k; i++) {
    let currMax = arr[i];
    for (let j = i; j < i + k; j++) {
      if (arr[j] > currMax) {
        currMax = arr[j];
      }
    }
    output.push(currMax);
  }
  return output;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // Expected output: [3,3,5,5,6,7]

function maxSlidingWindow(arr, k) {
  const deque = []; // stores indices
  const output = [];

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
      output.push(arr[deque[0]]); // max in current window
    }
  }

  return output;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// Output: [3, 3, 5, 5, 6, 7]
