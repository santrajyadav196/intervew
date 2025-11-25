function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let sum = nums[i] + nums[j];
      if (sum === target) {
        return [i, j];
      }
    }
  }

  return -1;
}

function twoSum(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const compliment = target - nums[i];
    if (map.has(compliment)) {
      return [map.get(compliment), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return -1;
}

function twoSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum > target) {
      right--;
    } else {
      left++;
    }
  }
  return -1;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
