function missingNumber(nums) {
  nums.sort((a, b) => a - b);
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nums[mid] === mid) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([3, 0, 1])); // 2
