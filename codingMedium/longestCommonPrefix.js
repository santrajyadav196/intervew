function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  for (let i = 0; i < strs[0].length; i++) {
    let char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      // Check if we've reached end of string OR character doesn't match
      if (i >= strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }

  return strs[0]; // ✅ All of first string is common prefix
}

// Start
//   ↓
// i=0, char='f'
//   ↓
// Check all strings at position 0
//   ├─ "flow"[0] = 'f' ✅
//   └─ "flight"[0] = 'f' ✅
//   ↓
// All match → Continue
//   ↓
// i=1, char='l'
//   ↓
// Check all strings at position 1
//   ├─ "flow"[1] = 'l' ✅
//   └─ "flight"[1] = 'l' ✅
//   ↓
// All match → Continue
//   ↓
// i=2, char='o'
//   ↓
// Check all strings at position 2
//   ├─ "flow"[2] = 'o' ✅
//   └─ "flight"[2] = 'i' ❌
//   ↓
// Mismatch found!
//   ↓
// Return substring(0, 2) = "fl"
//   ↓
// End

function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

// Step 1: prefix = "flower"
//         Compare with "flow"

//         "flower" ❌
//          "flow"

//         Trim: "flowe" ❌
//                "flow"

//         Trim: "flow" ✅
//               "flow"

// Step 2: prefix = "flow"
//         Compare with "flight"

//         "flow" ❌
//         "flight"

//         Trim: "flo" ❌
//               "flight"

//         Trim: "fl" ✅
//               "flight"

// Result: "fl"

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
