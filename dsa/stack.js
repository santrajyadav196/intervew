// Stack => last in first out(LIFO)

function isValidParentheses(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    // check open brack then push into the stack
    if (str[i] === "(" || str[i] === "{" || str[i] === "[") {
      stack.push(str[i]);
    } else {
      // check stack is empty or not
      //if stack is empty return false

      if (stack.length === 0) {
        return false;
      }

      // else remove last element from stack then

      const pop = stack.pop();
      // console.log(pop)

      // check if popped item and current item is equal or not
      // if popped is not corresponding bracket then return false

      if (
        (pop === "(" && str[i] !== ")") ||
        (pop === "[" && str[i] !== "]") ||
        (pop === "{" && str[i] !== "}")
      ) {
        return false;
      }
    }
  }
  // finally return stack conditionally.
  return stack.length === 0 ? true : false;
}

console.log(isValidParentheses("()")); // true
console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("(]")); // false

function stackSpan(prices) {
  const stack = []; // stores indexes
  const span = []; // stores span values

  for (let i = 0; i < prices.length; i++) {
    // Pop elements from stack while they are <= current price
    while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
      stack.pop();
    }

    // Calculate span
    if (stack.length === 0) {
      span[i] = i + 1;
    } else {
      span[i] = i - stack[stack.length - 1];
    }

    // Push current index
    stack.push(i);
  }

  return span;
}

console.log(stackSpan([100, 80, 60, 70, 60, 75, 85]));
// Output: [1, 1, 1, 2, 1, 4, 6]

function nextGreaterElement(arr) {
  const stack = []; // stores indexes
  const result = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result[i] = -1;
    } else {
      result[i] = stack[stack.length - 1];
    }

    stack.push(arr[i]);
  }

  return result;
}

console.log(nextGreaterElement([4, 5, 2, 25]));
// Expected output: [5, 25, 25, -1]

function previousSmallerElement(arr) {
  const stack = [];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && stack[stack.length - 1] >= arr[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      result[i] = -1;
    } else {
      result[i] = stack[stack.length - 1];
    }

    stack.push(arr[i]);
  }

  return result;
}

console.log(previousSmallerElement([4, 5, 2, 10, 8]));
// Expected output: [-1, 4, -1, 2, 2]

function nextGreaterElement2(arr) {
  const n = arr.length;
  const result = new Array(n).fill(-1);
  const stack = []; // will store values

  for (let i = 2 * n - 1; i >= 0; i--) {
    const curr = arr[i % n];

    // maintain decreasing stack
    while (stack.length > 0 && stack[stack.length - 1] <= curr) {
      stack.pop();
    }

    if (i < n) {
      // only fill result in first pass
      result[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
    }

    stack.push(curr);
  }

  return result;
}

console.log(nextGreaterElement2([3, 6, 5, 4, 2]));
// Output: [6, -1, 6, 6, 3]
