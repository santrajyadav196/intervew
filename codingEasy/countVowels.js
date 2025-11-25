function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}

function countVowels(str) {
  const vowels = "aeiouAEIOU";
  return [...str].reduce(
    (acc, count) => (vowels.includes(count) ? acc + 1 : acc),
    0
  );
}

console.log(countVowels("hello")); // 2
console.log(countVowels("JavaScript")); // 3
