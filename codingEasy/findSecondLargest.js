function findSecondLargest(arr) {
  // Step 1: Initialize variables
  let largest = -Infinity;
  let secondLargest = -Infinity;

  // Step 2: Loop through the array
  for (let i = 0; i < arr.length; i++) {
    // Step 3: Compare each element and update largest & secondLargest
    if (arr[i] > largest) {
      secondLargest = largest;
      largest = arr[i];
    } else if (arr[i] > secondLargest && arr[i] !== largest) {
      secondLargest = arr[i];
    }
  }

  // Step 4: Return result
  return secondLargest === -Infinity ? null : secondLargest;
}

console.log(findSecondLargest([10, 5, 8, 20, 3]));
