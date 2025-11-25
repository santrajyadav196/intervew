function sumOfArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function sumOfArray(arr) {
  return arr.reduce((acc, value) => acc + value, 0);
}

function sumOfArray(arr) {
  let sum = 0;
  arr.forEach((num) => (sum += num));
  return sum;
}

function sumOfArray(arr) {
  let sum = 0;
  let i = 0;
  let n = arr.length;

  while (i < n) {
    sum += arr[i];
    i++;
  }
  return sum;
}

function sumOfArray(arr, i = 0) {
  if (i === arr.length) return 0;
  
  return arr[i] + sumOfArray(arr, i + 1);
}

console.log(sumOfArray([1, 2, 3, 4])); // 10
