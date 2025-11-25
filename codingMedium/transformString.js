function transformString(str) {
  let strArr = str.split(" ");
  let result = [];

  for (let word of strArr) {
    let reverseWord = word.split("").reverse().join("");
    let capOfFirstWord = reverseWord[0].toUpperCase() + reverseWord.slice(1);

    const removedDuplicateChar = [...new Set(capOfFirstWord)].join("");

    result.push(removedDuplicateChar);
  }

  return result.join(" ");
}

console.log(transformString("hello world programming"));
