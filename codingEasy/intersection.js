function intersection(arr1, arr2) {
  let result = [];

  for (let item of arr1) {
    if (arr2.includes(item) && !result.includes(item)) {
      result.push(item);
    }
  }

  return result;
}

function intersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return [...set1].filter((item) => set2.has(item));
}

console.log(intersection([1, 2, 2, 3, 4], [2, 2, 3, 5]));
// 👉 [2, 3]
