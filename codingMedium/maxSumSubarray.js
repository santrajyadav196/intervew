function maxSumSubarray(arr) {
  let maxSum = -Infinity; // handle negative numbers

  for (let i = 0; i < arr.length; i++) {
    let currSum = 0;
    for (let j = i; j < arr.length; j++) {
      currSum += arr[j];
      maxSum = Math.max(maxSum, currSum);
    }
  }

  return maxSum;
}

function maxSumSubarray(arr) {
  let maxSum = arr[0];
  let currMax = arr[0];

  for (let i = 0; i < arr.length; i++) {
    currMax = Math.max(arr[i], currMax + arr[i]);
    maxSum = Math.max(maxSum, currMax);
  }

  return maxSum;
}

console.log(maxSumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Expected output: 6
