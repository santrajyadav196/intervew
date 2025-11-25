function reverseString(str) {
  if (str === "") return "";
  if (str.length === 1) {
    return str;
  }
  return str.split("").reverse().join("");
}

function reverseString(str) {
  if (str === "") return "";
  if (str.length === 1) {
    return str;
  }

  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

function reverseString(str) {
  if (str === "" || str === " ") {
    return "";
  }

  return reverseString(str.slice(1)) + str[0];
}

function reverseString(str) {
  if (str === "" || str === " ") {
    return "";
  }

  return str.split("").reduce((acc, char) => char + acc, "");
}

console.log(reverseString("hello"));
