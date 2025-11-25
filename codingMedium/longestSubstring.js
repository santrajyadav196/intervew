function longestSubstring(str) {
  let longest = "";

  for (let i = 0; i < str.length; i++) {
    // Try every starting position
    let subStr = "";
    for (let j = i; j < str.length; j++) {
      // Extend from position i
      if (!subStr.includes(str[j])) {
        // Check if character is new
        subStr += str[j];
      } else {
        break; // Stop at first duplicate
      }
    }

    if (subStr.length > longest.length) {
      longest = subStr;
    }
  }
  return longest;
}

function longestSubstring(str) {
  let seen = new Set();
  let left = 0;
  let longest = "";

  for (let right = 0; right < str.length; right++) {
    while (seen.has(str[right])) {
      seen.delete(str[left]);
      left++;
    }

    seen.add(str[right]);
    // Update longest substring
    if (right - left + 1 > longest.length) {
      longest = s.slice(left, right + 1);
    }
  }

  return longest;
}

// Test cases
console.log(longestSubstring("abcabcdbb")); // "abcd"
console.log(longestSubstring("bbbbb")); // "b"
console.log(longestSubstring("pwwkew")); // "wke"
