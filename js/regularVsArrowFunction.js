// 🔹 Question 7: What is the difference between regular functions and arrow functions in JavaScript?

//Regular function:
//1.Has its own this (depends on how function is called);
//2.arguments object is available
//3.Used as constructor (new)

// Arrow function:
//1.Inherits this from lexical scope (where it was defined)
//2.arguments object is not available
//3. can't use as constructor(new)

// 💻 Example 1 – this difference
const person = {
  name: "Santraj",
  regularFn: function () {
    console.log("Regular:", this.name);
  },
  arrowFn: () => {
    console.log("Arrow:", this.name);
  },
};

person.regularFn(); // ✅ Regular: Santraj
person.arrowFn(); // ❌ Arrow: undefined (or window.name)

// 👉 arrowFn doesn’t have its own this, it takes this from the outer scope (global).

// 💻 Example 2 – Cannot use as constructor
function Normal() {}
const Arrow = () => {};

const obj1 = new Normal(); // ✅ Works
const obj2 = new Arrow(); // ❌ TypeError: Arrow is not a constructor

// 💻 Example 3 – arguments object
function normalFunc() {
  console.log(arguments);
}
normalFunc(1, 2, 3); // ✅ [1, 2, 3]

const arrowFunc = () => {
  console.log(arguments);
};
arrowFunc(1, 2, 3); // ❌ ReferenceError: arguments is not defined

// 🧩 In Short

// Use arrow functions for:
// Callbacks (map, filter, forEach)
// When you don’t want your own this

// Use regular functions for:
// Object methods
// Constructors
// Event handlers that depend on this

// 💻 Example 4 – arguments object Arrow vs Regular Function):

const user = {
  name: "Santraj",
  showName: function () {
    document.querySelector("#btn").addEventListener("click", function () {
      console.log(`Hello, ${this.name}!`);
    });
  },
};

user.showName();

// ❓ Questions:

// What will be printed when the button is clicked?

// Why does it happen?

// How can you fix it so that clicking the button logs:
// ✅ Hello, Santraj!

// 🔍 What happens:
// When you click the button:
// The callback function inside addEventListener is a regular function.
// Its this refers to the HTML element (#btn), not the user object.
// Since the button element has no name property, it prints:
// Hello, undefined!

// 🧩 Fix: Use Arrow Function

// Arrow functions don’t have their own this, so they use the this from the surrounding scope (showName method → user object).

const user2 = {
  name: "Santraj",
  showName: function () {
    document.querySelector("#btn").addEventListener("click", () => {
      console.log(`Hello, ${this.name}!`);
    });
  },
};

// ✅ Output on click →
// Hello, Santraj!
