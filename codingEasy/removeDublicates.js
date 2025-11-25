function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function removeDuplicates(arr) {
  return arr.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
}

function removeDuplicates(arr) {
  const seen = {};
  const result = [];

  for (let num of arr) {
    if (!seen[num]) {
      seen[num] = true;
      result.push(num);
    }
  }
  return result;
}

console.log(removeDuplicates([4, 5, 9, 4, 9, 1, 5, 3]));
