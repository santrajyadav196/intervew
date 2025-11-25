function findLongestWord(sentence) {
  let longest = "";

  const words = sentence.split(" ");

  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}

function findLongestWord(sentence) {
  const words = sentence.split(" ");

  return words.reduce(
    (acc, word) => (word.length > acc.length ? word : acc),
    ""
  );
}

console.log(findLongestWord("I love programming very much")); // "programming"
