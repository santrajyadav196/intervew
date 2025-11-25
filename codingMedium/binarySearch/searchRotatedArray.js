function searchRotatedArray(nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nums[mid] === target) return mid;

    // Check if left half is sorted
    if (nums[start] <= nums[mid]) {
      if (nums[start] <= target && target < nums[mid]) {
        end = mid - 1; // go left
      } else {
        start = mid + 1; // go right
      }
    }
    // Otherwise right half is sorted
    else {
      if (nums[mid] < target && target <= nums[end]) {
        start = mid + 1; // go right
      } else {
        end = mid - 1; // go left
      }
    }
  }

  return -1;
}

console.log(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0)); // 4
