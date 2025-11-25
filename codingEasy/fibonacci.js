function fibonacci(n) {
  if (n < 2) return n;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    let next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

function fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// fibonacci series will be 0, 1, 1, 2, 3, 5, 8, 13, 21 etc
console.log(fibonacci(0)); // expected 0
console.log(fibonacci(1)); // expected 1
console.log(fibonacci(5)); // expected 5
console.log(fibonacci(10)); // expected 55

function fibonacci(F0, F1) {
  const result = [F0, F1];

  for (let i = 2; i < 11; i++) {
    let next = result[i - 1] + result[i - 2];
    result.push(next);
  }

  return result;
}

// Test your function
console.log(fibonacci(3, 5)); // expected 0
