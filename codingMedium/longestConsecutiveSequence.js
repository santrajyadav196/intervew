function longestConsecutiveSequence(nums) {
  if (nums.length === 0) return 0;
  let maxLength = 0;
  for (let num of nums) {
    // Only start counting if this is the beginning of a sequence
    if (!nums.includes(num - 1)) {
      let currentNum = num;
      let length = 1;

      while (nums.includes(currentNum + 1)) {
        currentNum++;
        length++;
      }

      maxLength = Math.max(maxLength, length);
    }
  }

  return maxLength;
}

function longestConsecutiveSequence(nums) {
  const numsSet = new Set(nums);
  let maxLength = 0;

  for (let num of numsSet) {
    if (!numsSet.has(num - 1)) {
      // only start at beginning of sequence
      let currentNum = num;
      let length = 1;

      while (numsSet.has(currentNum + 1)) {
        currentNum++;
        length++;
      }

      maxLength = Math.max(maxLength, length);
    }
  }
  return maxLength;
}

function longestConsecutiveSorting(nums) {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b);
  let maxLength = 1;
  let currentLength = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      // ignore duplicates
      if (nums[i] === nums[i - 1] + 1) {
        currentLength++;
      } else {
        maxLength = Math.max(maxLength, currentLength); // ✅ Update before reset
        currentLength = 1;
      }
    }
  }

  return Math.max(maxLength, currentLength); // ✅ Final update after loop
}

console.log(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])); // 9
