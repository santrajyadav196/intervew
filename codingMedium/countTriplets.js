function countTriplets(nums) {
  const seen = new Set(nums);
  const triplets = new Set();

  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let a = nums[i];
      let b = nums[j];
      let c = a + b;
      if (seen.has(c)) {
        // normalize triplet so (a,b,c) == (b,a,c)
        let triplet = [a, b, c].sort((x, y) => x - y).join(",");
        triplets.add(triplet);
      }
    }
  }

  return triplets.size;
}

function countTriplets(nums) {
  nums.sort((a, b) => a - b); // sort array
  let n = nums.length;
  let count = 0;

  // Fix c at nums[k]
  for (let k = n - 1; k >= 0; k--) {
    let c = nums[k];
    let i = 0; // left pointer
    let j = k - 1; //right pointer which is one less than current loop or index

    while (i < j) {
      let sum = nums[i] + nums[j];
      if (sum === c) {
        count++;
        i++;
        j--;
      } else if (sum < c) {
        i++;
      } else {
        j--;
      }
    }
  }

  return count;
}

// 🔹 Examples
console.log(countTriplets([1, 5, 3, 2])); // Output: 2  → {1,2,3}, {2,3,5}
console.log(countTriplets([2, 3, 4])); // Output: 0
console.log(countTriplets([1, 2, 3, 4, 5])); // Output: 4 → {1,2,3}, {1,3,4}, {1,4,5}, {2,3,5}
