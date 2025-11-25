function findSecondSmallest(arr) {
  // Step 1: Initialize variables
  let smallest = Infinity;
  let secondSmallest = Infinity;

  // Step 2: Loop through the array
  for (let i = 0; i < arr.length; i++) {
    // Step 3: Compare and update smallest & secondSmallest
    if (arr[i] < smallest) {
      secondSmallest = smallest;
      smallest = arr[i];
      // update smallest and secondSmallest
    } else if (arr[i] > smallest && arr[i] < secondSmallest) {
      // update only secondSmallest
      secondSmallest = arr[i];
    }
  }

  // Step 4: Return result (handle edge case)
  return secondSmallest;
}

console.log(findSecondSmallest([10, 5, 8, 20, 3]));
