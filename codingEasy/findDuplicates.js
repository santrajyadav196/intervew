function findDuplicates(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        result.push(arr[j]);
      }
    }
  }
  return result;
}

function findDuplicates(arr) {
  const map = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (map[arr[i]] === 1) {
      result.push(arr[i]);
      map[arr[i]]++; // mark as counted
    } else if (!map[arr[i]]) {
      map[arr[i]] = 1;
    }
  }

  return result;
}

function findDuplicates(arr) {
  let set = new Set();
  let uniqueDublicate = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      uniqueDublicate.add(arr[i]);
    } else {
      set.add(arr[i]);
    }
  }
  return [...uniqueDublicate];
}

function findDuplicates(arr) {
  // Step 1: Create a frequency map
  const count = {};

  // Step 2: Loop through array → count occurrences
  for (let item of arr) {
    count[item] = (count[item] || 0) + 1;
  }

  // Step 3: Collect only items appearing more than once
  const result = [];

  for (let key in count) {
    if (count[key] > 1) {
      result.push(key);
    }
  }

  // Step 4: Return the duplicate items
  return result;
}

console.log(findDuplicates([1, 2, 3, 4, 2, 3, 5])); // ✅ [2, 3]
console.log(findDuplicates([1, 2, 2, 2, 3, 3])); // ✅ [2, 3]
