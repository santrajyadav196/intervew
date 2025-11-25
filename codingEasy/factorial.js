function factorial(n) {
  let result = 1;
  if (n === 0 || n === 1) {
    return result;
  }
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorial(n) {
  let result = 1;
  while (n > 1) {
    result *= n;
    n--;
  }
  return result;
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1; // base case
  }

  return n * factorial(n - 1); // recursive case
}

console.log(factorial(0)); // 1
