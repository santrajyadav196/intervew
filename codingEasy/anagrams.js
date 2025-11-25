function anagrams(str1, str2) {
  // Step 1: Remove spaces and convert to lowercase for uniformity
  str1 = str1.replace(/\s/g, "").toLowerCase();
  str2 = str2.replace(/\s/g, "").toLowerCase();

  // Step 2: Sort and compare
  let sortedStr1 = str1.split("").sort().join("");
  let sortedStr2 = str2.split("").sort().join("");

  return sortedStr1 === sortedStr2;
}

function anagramsOptimized(str1, str2) {
  // Step 1: Normalize input (remove spaces, lowercase)
  str1 = str1.replace(/\s/g, "").toLowerCase();
  str2 = str2.replace(/\s/g, "").toLowerCase();

  // Step 2: Quick check for unequal lengths
  if (str1.length !== str2.length) return false;

  // Step 3: Create frequency map for str1
  const charCount = {};
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Step 4: Decrease count for each char in str2
  for (let char of str2) {
    if (!charCount[char]) return false; // char missing or overused
    charCount[char]--;
  }

  // Step 5: If all counts are zero → anagram
  return true;
}

// ✅ Test cases
console.log(anagrams("listen", "silent")); // true
console.log(anagrams("rail safety", "fairy tales")); // true
console.log(anagrams("Hello", "Oleh")); // true
console.log(anagrams("hi", "bye")); // false
