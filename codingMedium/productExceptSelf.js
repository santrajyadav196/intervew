function productExceptSelf(arr) {
  let n = arr.length;
  let res = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        res[i] *= arr[j];
      }
    }
  }

  return res;
}

function productExceptSelf(arr) {
  const n = arr.length;
  const prefProduct = new Array(n).fill(1);
  const suffProduct = new Array(n).fill(1);
  const res = new Array(n);

  for (let i = 1; i < n; i++) {
    prefProduct[i] = arr[i - 1] * prefProduct[i - 1];
  }

  // Construct the suffProduct array
  for (let j = n - 2; j >= 0; j--) {
    suffProduct[j] = arr[j + 1] * suffProduct[j + 1];
  }

  for (let i = 0; i < n; i++) {
    res[i] = prefProduct[i] * suffProduct[i];
  }

  return res;
}

console.log(productExceptSelf([10, 3, 5, 6, 2])); //[ 180, 600, 360, 300, 900 ]
//left=[1, 10, 30, 150, 900]
//right=[180, 60, 12, 2, 1]
