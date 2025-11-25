function findSubArray(arr, n) {
  const result = [];
  for (let i = 0; i <= arr.length - n; i += n) {
    let subArr = [];
    for (let j = i; j < n + i; j++) {
      subArr.push(arr[j]);
    }
    result.push(subArr);
  }

  return result;
}

function findSubArray(arr, n) {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }

  return result;
}

console.log(findSubArray([1, 2, 3, 4, 5, 6, 7, 8, 9], 3));
