function searchInsertPosition(nums, target) {
  let start = 0;
  let end = nums.length - 1;
  let insertPosition = nums.length; // assume target goes at end

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nums[mid] >= target) {
      insertPosition = mid; // store possible insert index
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return insertPosition;
}

console.log(searchInsertPosition([1, 3, 5, 6], 5)); // 2
console.log(searchInsertPosition([1, 3, 5, 6], 2)); // 1
console.log(searchInsertPosition([1, 3, 5, 6], 7)); // 4
console.log(searchInsertPosition([1, 3, 5, 6], 0)); // 0
