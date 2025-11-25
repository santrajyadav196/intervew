// this refers to the execution context — it tells which object is currently executing the function.
// It depends on how the function is called, not where it’s defined.

// 🚦 2. this in Different Contexts

// a) Global Context

// In the global scope (outside any function):

console.log(this);

// In browser → window
// In Node.js → {} (module scope, not global)

// b) Inside a Regular Function

function showThis() {
  console.log(this);
}

showThis();
// In browser => window (in browser) OR undefined (in strict mode)
// In node js=> global object

// ✅ If "use strict" is enabled in both browser and node js, this becomes undefined in normal functions.
// Otherwise, it points to the global object.

// c) Inside an Object Method

const user = {
  name: "Santraj",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

user.greet(); // "Hello, Santraj"

// ✅ Here this refers to the object before the dot (user).

// d) Detached Function Reference

const greetFn = user.greet;
greetFn(); // ❌ undefined (this is lost)

// ✅ Fix it using bind, call, or arrow functions:
const greetFn2 = user.greet.bind(user);
greetFn2(); // ✅ Hello, Santraj

// e) In Arrow Functions
// Arrow functions don’t have their own this.
// They inherit it from the surrounding lexical scope.

const obj = {
  name: "Santraj",
  regularFn: function () {
    console.log(this.name); // ✅ Santraj
  },
  arrowFn: () => {
    console.log(this.name); // ❌ undefined (from global scope)
  },
};

obj.regularFn();
obj.arrowFn();

// ✅ Use regular functions in object methods if you need to access object properties via this.

// f) In Constructor Functions

// When you use the new keyword:
// A new empty object is created.
// this points to that object.

function Person(name) {
  this.name = name;
}

const p1 = new Person("Santraj");
console.log(p1.name); // Santraj

// g) In Classes

// Classes use the same rule as constructor functions.

class Car {
  constructor(brand) {
    this.brand = brand;
  }
  showBrand() {
    console.log(this.brand);
  }
}

const c = new Car("Tesla");
c.showBrand(); // Tesla

// h) In Event Listeners
const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  console.log(this); // ✅ <button> element
});

btn.addEventListener("click", () => {
  console.log(this); // ❌ inherits outer 'this' (window)
});

// ✅ Use regular function if you need to refer to the element itself inside event listeners.

// 🧩 3. Changing this using call, apply, bind
function greet() {
  console.log(`Hello, ${this.name}`);
}

const user2 = { name: "Santraj" };

greet.call(user2); // Hello, Santraj
greet.apply(user2); // Hello, Santraj
const boundFn = greet.bind(user2);
boundFn(); // Hello, Santraj

// 🔍 4. Common Interview Traps
// ❌ Trap 1: Losing this in callbacks

const user3 = {
  name: "Santraj",
  greet() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  },
};

user3.greet(); // ❌ undefined

// ✅ Fix:
setTimeout(() => console.log(this.name), 1000); // ✅ Santraj

// ❌ Trap 2: this inside nested objects

const obj2 = {
  name: "Outer",
  inner: {
    name: "Inner",
    show() {
      console.log(this.name);
    },
  },
};

obj2.inner.show(); // ✅ Inner

// But if you extract it:
const show = obj.inner.show;
show(); // ❌ undefined

// ✅ Fix:

const show2 = obj.inner.show.bind(obj.inner);
show2(); // ✅ Inner
