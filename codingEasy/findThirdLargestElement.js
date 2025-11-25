function findThirdLargestElement(arr) {
  let largest = -Infinity;
  let secondLargest = -Infinity;
  let thirdLargest = -Infinity;

  for (let num of arr) {
    if (num > largest) {
      thirdLargest = secondLargest;
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num <= largest) {
      thirdLargest = secondLargest;
      secondLargest = num;
    } else if (num > thirdLargest && num <= secondLargest) {
      thirdLargest = num;
    }
  }

  return thirdLargest;
}

console.log(findThirdLargestElement([10, 20, 15, 5, 8, 25])); // Output: 15
