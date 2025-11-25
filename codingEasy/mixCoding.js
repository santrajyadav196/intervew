function camelCase(words) {
  const wordsToArray = words.split(" ");
  // console.log(wordsToArray);

  const res = [];
  for (let word of wordsToArray) {
    const camelCase = word[0].toUpperCase() + word.slice(1);
    res.push(camelCase);
  }
  return res.join(" ");
}

console.log(camelCase("santraj yadav"));
