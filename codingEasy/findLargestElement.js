function findLargest(arr) {
  return Math.max(...arr);
}

function findLargest(arr) {
  let larget = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > larget) {
      larget = arr[i];
    }
  }

  return larget;
}

function findLargest(arr) {
  return arr.reduce((acc, item) => (item > acc ? item : acc), -Infinity);
}

function findLargest(arr) {
  return arr.sort((a, b) => b - a)[0];
}

console.log(findLargest([3, 7, 2, 9, 5])); // 9
