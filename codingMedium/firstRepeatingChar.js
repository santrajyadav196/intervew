function firstRepeatingChar(str) {
  let freq = {};

  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (let char of str) {
    if (freq[char] > 1) {
      return char;
    }
  }
  return -1;
}

function firstRepeatingChar(str) {
  let seen = new Set();

  for (let char of str) {
    if (seen.has(char)) {
      return char;
    } else {
      seen.add(char);
    }
  }
  return -1;
}

console.log(firstRepeatingChar("abcdeab")); // "a"
console.log(firstRepeatingChar("abcdef")); // -1
