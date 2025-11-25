function sqrt(x) {
  if (x === 0 || x === 1) return x;

  for (let i = 1; i <= x; i++) {
    if (i * i === x) {
      return i; // perfect square
    }
    if (i * i > x) {
      return i - 1; // floor value
    }
  }
}

function sqrtMath(x) {
  return Math.floor(Math.sqrt(x));
}

function sqrtBrute(x) {
  let i = 0;

  while (i * i <= x) {
    i++;
  }

  return i - 1;
}

function sqrt(x) {
  let start = 0;
  let end = x;
  let result = -1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      result = mid; // store best possible answer
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return result;
}

console.log(sqrt(4)); // 2
console.log(sqrt(8)); // 2   (√8 = 2.82 → floor value = 2)
console.log(sqrt(1)); // 1
console.log(sqrt(0)); // 0
console.log(sqrt(26)); // 5  (√26 = 5.09)
