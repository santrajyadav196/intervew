function groupAnagrams(arr) {
  let freq = {};

  for (let word of arr) {
    let sortedWord = word.split("").sort().join("");
    if (freq[sortedWord]) {
      freq[sortedWord].push(word);
    } else {
      freq[sortedWord] = [word];
    }
  }
  return Object.values(freq);
}

function groupAnagrams(arr) {
  let map = new Map();

  for (let word of arr) {
    let sortedWord = word.split("").sort().join("");
    if (map.has(sortedWord)) {
      map.get(sortedWord).push(word);
    } else {
      map.set(sortedWord, [word]);
    }
  }
  return Array.from(map.values());
}

function groupAnagrams(arr) {
  return Object.values(
    arr.reduce((acc, word) => {
      const sortedWord = word.split("").sort().join("");
      if (!acc[sortedWord]) {
        acc[sortedWord] = [];
      }
      acc[sortedWord].push(word);

      return acc;
    }, {})
  );
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// Expected output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
