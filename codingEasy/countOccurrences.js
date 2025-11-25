function countOccurrences(arr) {
  const count = {};

  for (let num of arr) {
    if (count[num]) {
      count[num]++;
    } else {
      count[num] = 1;
    }
  }

  return count;
}

function countOccurrences(arr) {
  let map = new Map();

  for (let num of arr) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  return Object.fromEntries(map);
}

function countOccurrences(arr) {
  return arr.reduce((acc, item) => {
    if (!acc[item]) {
      acc[item] = 1;
    } else {
      acc[item]++;
    }
    return acc;
  }, {});
}
console.log(countOccurrences([4, 5, 9, 4, 9, 1, 5, 3]));
// Output: { 4: 2, 5: 2, 9: 2, 1: 1, 3: 1 }
