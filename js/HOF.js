// A Higher-Order Function (HOF) is a function that either takes another function as an argument, returns a function, or does both.

// this is possible in JavaScript because functions are first-class citizens — meaning they can be treated like variables (passed, returned, stored, etc.).

// 🔹 1. Passing a Function as an Argument
// This is one of the most common use cases.
function greet(name) {
  return `Hello, ${name}`;
}

function processUserInput(callback) {
  const name = "Santraj";
  console.log(callback(name));
}

processUserInput(greet);

// ✅ Explanation:
// processUserInput takes a function callback as an argument.
// It calls callback("Santraj"), which becomes greet("Santraj").

// Output: Hello, Santraj.

// 🔹 2. Returning a Function from Another Function
// A higher-order function can return another function (used in currying or closures).

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// ✅ Explanation:

// multiplier returns a new function each time.
// The returned function “remembers” factor via closure.

// 🔹 3. Built-in Higher-Order Functions (Array Methods)

// 🔸 map() – transforms each element and returns a new array
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]

// 🔸 filter() – keeps elements that satisfy a condition
const numbers2 = [1, 2, 3, 4];
const even = numbers2.filter((num) => num % 2 === 0);
console.log(even); // [2, 4]

// 🔸 reduce() – accumulates array values into a single value
const numbers3 = [1, 2, 3, 4];
const sum = numbers3.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

// 🔸 forEach() – iterates over elements but doesn’t return anything

const fruits = ["apple", "banana", "mango"];
fruits.forEach((fruit) => console.log(fruit));

// 🔹 4. Why Use Higher-Order Functions?

// ✅ Improves code reusability
// ✅ Makes code declarative and readable
// ✅ Enables functional programming patterns
// ✅ Reduces redundancy and side effects

// 🧩 Example Combining HOFs:

const users = [
  { name: "Ava", age: 25 },
  { name: "Ben", age: 30 },
  { name: "Clara", age: 20 },
];

const result = users
  .filter((user) => user.age >= 25)
  .map((user) => user.name.toUpperCase())
  .reduce((acc, name) => acc + ", " + name);

console.log(result); // "AVA, BEN"
