function findMajorityElement(nums) {
  let freq = {};
  let majority = 0;
  let majorityEle = "";

  for (let num of nums) {
    freq[num] = (freq[num] || 0) + 1;
  }

  for (let num of nums) {
    if (freq[num] > majority) {
      majority = freq[num];
      majorityEle = num;
    }
  }

  return majorityEle;
}

// ⚡️ Time and Space Complexity

// Time: O(n) (two loops but linear)
// Space: O(n) (extra space for freq object)

// ✅ Optimized Approach (Boyer–Moore Majority Vote)

function findMajorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (let num of nums) {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
  }

  return candidate;
}

console.log(findMajorityElement([3, 2, 3])); // 3
