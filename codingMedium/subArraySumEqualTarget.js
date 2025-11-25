function subArraySumEqualTarget(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    let currSum = 0;
    for (let j = i; j < arr.length; j++) {
      currSum += arr[j];
      if (currSum === target) {
        return [i, j];
      }
    }
  }

  return [-1];
}

function subArraySumEqualTarget(arr, target) {
  let left = 0;
  let sum = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    // shrink the window if sum exceeds target
    while (sum > target) {
      sum -= arr[left];
      left++;
    }
    if (sum === target) {
      return [left, right];
    }
  }

  return [-1];
}

console.log(subArraySumEqualTarget([1, 2, 3, 7, 5], 12)); //[1,3]

function subarraySumWithNegatives(nums, k) {
  let map = new Map(); // prefixSum → index
  map.set(0, -1);
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (map.has(sum - k)) {
      return [map.get(sum - k) + 1, i];
    }

    if (!map.has(sum)) {
      map.set(sum, i);
    }
  }

  return [-1];
}

console.log(subarraySumWithNegatives([10, 2, -2, -20, 10], -10)); // [0, 3]
