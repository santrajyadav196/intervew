function isPalindrome(str) {
  const reversed = str.split("").reverse().join("");
  return str === reversed;
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false

function isPalindromeClean(str) {
  const cleanStr = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversed = cleanStr.split("").reverse().join("");
  return cleanStr === reversed;
}

console.log(isPalindromeClean("A man a plan a canal Panama")); // true
console.log(isPalindromeClean("Was it a car or a cat I saw")); // true
console.log(isPalindromeClean("hello")); // false

function isPalindromeTwoPointers(str) {
  const cleanStr = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
  let left = 0;
  let right = cleanStr.length - 1;

  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) return false;
    left++;
    right--;
  }

  return true;
}

console.log(isPalindromeTwoPointers("A man a plan a canal Panama")); // true
console.log(isPalindromeTwoPointers("hello")); // false

function isNumberPalindrome(num) {
  const str = num.toString();
  return str === str.split("").reverse().join("");
}

console.log(isNumberPalindrome(121)); // true
console.log(isNumberPalindrome(123)); // false

function isNumberPalindromeMath(num) {
  if (num < 0) return false;
  let original = num;
  let reversed = 0;

  while (num > 0) {
    const digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }

  return original === reversed;
}

console.log(isNumberPalindromeMath(121)); // true
console.log(isNumberPalindromeMath(123)); // false
