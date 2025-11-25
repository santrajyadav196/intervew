// You are given an integer array arr[]. Your task is to find the smallest positive number missing from the array.
// Note: Positive number starts from 1. The array can have negative integers too.
// Examples:
// Input: arr[] = [2, -3, 4, 1, 1, 7]
// Output: 3
// Explanation: Smallest positive missing number is 3.positive

function findSmallestPositiveMissingNum(nums) {
  const positiveNum = [
    ...new Set(nums.filter((num) => num > 0).sort((a, b) => a - b)),
  ];
  let expected = 1;

  for (let i = 0; i < positiveNum.length - 1; i++) {
    if (positiveNum[i] === expected) {
      expected++;
    } else if (positiveNum[i] > expected) {
      return expected;
    }
  }

  return positiveNum[positiveNum.length - 1] + 1;
}

console.log(findSmallestPositiveMissingNum([2, -3, 4, 1, 1, 7]));
