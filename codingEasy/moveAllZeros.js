function moveAllZeros(nums) {
  let result = [];
  let zeros = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      result.push(nums[i]);
    } else {
      zeros++;
    }
  }

  for (let i = 0; i < zeros; i++) {
    result.push(0);
  }

  return result;
}

function moveAllZeros(nums) {
  let insertedPos = 0;

  // Step 1: Move all non-zero elements forward
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertedPos] = nums[i];
      insertedPos++;
    }
  }

  // Step 2: Fill remaining positions with 0
  while (insertedPos < nums.length) {
    nums[insertedPos] = 0;
    insertedPos++;
  }

  return nums;
}

console.log(moveAllZeros([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
