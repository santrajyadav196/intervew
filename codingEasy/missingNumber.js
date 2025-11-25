function findMissingNumber(arr) {
  if (arr.length === 0) return -1;
  const n = arr.length + 1;
  // Step 1: Calculate the expected sum (1 to n)
  const expectedSum = (n * (n + 1)) / 2;
  // Step 2: Calculate actual sum from the array
  const actualSum = arr.reduce((acc, item) => acc + item, 0);
  // Step 3: Return the difference
  return expectedSum - actualSum;
}

function findMissingNumber(arr) {
  arr.sort((a, b) => a - b);

  if (arr.length === 0) return -1;

  // If missing number is before the first element
  if (arr[0] !== 1) {
    return 1;
  }

  // Check between elements
  for (let i = 0; i < arr.length - 1; i++) {
    let curr = arr[i];
    let next = arr[i + 1];
    if (next - curr > 1) {
      return curr + 1;
    }
  }

  // If no missing inside, return next number after last
  return arr[arr.length - 1] + 1;
}

function missingNum(arr) {
  if (arr.length === 0) return -1; // handle empty array

  let set = new Set(arr);

  for (let i = 1; i <= arr.length + 1; i++) {
    if (!set.has(i)) return i;
  }

  return -1; // fallback if nothing missing
}

// ✅ Test cases
console.log(missingNum([1, 2, 4, 5])); // 3
console.log(missingNum([3, 1, 2, 5])); // 4
console.log(missingNum([2, 3])); // 1
console.log(missingNum([1, 2, 3])); // 4
console.log(missingNum([7])); // 8
console.log(missingNum([])); // -1
