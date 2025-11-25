function firstNonRepeatingChar(str) {
  let freq = {};

  // Step 1️⃣ — Count frequencies
  for (let char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Step 2️⃣ — Find the first char with count === 1
  for (let char of str) {
    if (freq[char] === 1) {
      return char;
    }
  }

  // Step 3️⃣ — If no unique char found
  return -1;
}

function firstNonRepeatingChar(str) {
  let map = new Map();

  for (let char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (let [char, value] of map) {
    if (value === 1) {
      return char;
    }
  }
  return -1;
}

function firstNonRepeatingChar(str) {
  return [...str].find((ch) => str.indexOf(ch) === str.lastIndexOf(ch)) || -1;
}

console.log(firstNonRepeatingChar("aabbcddee")); // "c"
console.log(firstNonRepeatingChar("aabbcc")); // -1
