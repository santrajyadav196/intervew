function largestSumOfTwoNums(arr) {
  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num <= largest) {
      secondLargest = num;
    }
  }

  return largest + secondLargest;
}

function largestSumOfTwoNums(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let sum = arr[i] + arr[j];
      if (sum > result) {
        result = sum;
      }
    }
  }
  return result;
}

console.log(largestSumOfTwoNums([10, 5, 20, 8])); // output: 30
