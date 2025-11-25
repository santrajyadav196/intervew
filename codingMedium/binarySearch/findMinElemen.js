function findMinElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // if mid element is greater than the rightmost,
    // minimum must be on the right side
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      // minimum is on the left side (including mid)
      right = mid;
    }
  }

  return nums[left]; // or nums[right], both same when loop ends
}

console.log(findMinElement([4, 5, 6, 7, 0, 1, 2])); // 0
