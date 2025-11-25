function findSmallest(arr) {
  return Math.min(...arr);
}

function findSmallest(arr) {
  let smallest = Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }
  return smallest;
}

function findSmallest(arr) {
  return arr.reduce((acc, item) => (item < acc ? item : acc), Infinity);
}

function findSmallest(arr) {
  return arr.sort((a, b) => a - b)[0];
}

console.log(findSmallest([3, 7, 2, 9, 5]));
