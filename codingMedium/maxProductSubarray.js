function maxProductSubarray(arr) {
  let maxProduct = arr[0];

  for (let i = 0; i < arr.length; i++) {
    let currMaxProduct = 1;
    for (let j = i; j < arr.length; j++) {
      currMaxProduct *= arr[j];
      maxProduct = Math.max(currMaxProduct, maxProduct);
    }
  }
  return maxProduct;
}

function maxProductSubarray(arr) {
  let maxProduct = arr[0];
  let currMax = arr[0];
  let currMin = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // If current element is negative, swap currMax and currMin
    if (arr[i] < 0) [currMax, currMin] = [currMin, currMax];

    currMax = Math.max(arr[i], currMax * arr[i]);

    currMin = Math.min(arr[i], currMin * arr[i]);

    maxProduct = Math.max(maxProduct, currMax);
  }

  return maxProduct;
}

console.log(maxProductSubarray([-2, 6, -3, -10, 0, 2])); // Expected output: 180
