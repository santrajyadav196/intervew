// 🔹 1. What is a Prototype?
// In JavaScript, everything is an object (except primitives).
// Every object in JS has an internal property called [[Prototype]], which refers to another object.

// This creates a prototype chain that JavaScript uses for property inheritance.

// You can access an object’s prototype using:
Object.getPrototypeOf(obj);
// or using __proto__ (not recommended in production but useful for learning).

// 📘 2. Prototype Chain
// When you try to access a property or method on an object:
// JS first checks if it exists directly on the object.
// If not found, it looks up the prototype chain.

const person = {
  greet() {
    console.log("Hello!");
  },
};

const user = Object.create(person); // sets prototype of user to person

user.name = "Santraj";

user.greet(); // "Hello!" ✅ (found in prototype)
console.log(user.__proto__ === person); // true

// 🧩 Explanation:
// user does not have greet() method.
// JS looks into its prototype (person).
// Finds greet() and executes it.

// ⚙️ 3. Function Constructors and Prototypes

// Before ES6 classes, JS used constructor functions to create reusable object blueprints.

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const user1 = new Person("Santraj");
const user2 = new Person("Ravi");

user1.sayHello(); // Hello, my name is Santraj
user2.sayHello(); // Hello, my name is Ravi

// 🧠 Key Point:

// Person.prototype is an object shared by all instances created using new Person().

// So, all instances share the same sayHello() method — memory efficient.

// 🧱 4. Prototype Chain Visualization
// user1 ---> Person.prototype ---> Object.prototype ---> null

// user1.sayHello → found in Person.prototype
// If not found → JS checks Object.prototype
// If still not found → returns undefined

// 🧩 5. ES6 Classes (Syntactic Sugar over Prototypes)

// Classes in JS are not like Java or C++ classes — they are syntax sugar over the prototype system.

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const user = new Person("Santraj");
user.greet(); // Hi, I'm Santraj

// Under the hood:
typeof Person; // "function"
console.log(Person.prototype.greet); // function exists on prototype

// ✅ Same prototype-based inheritance — just cleaner syntax.
// 🧬 6. Prototypal Inheritance with Classes
// You can create a subclass using extends and super.

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // calls parent constructor
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Rocky", "Labrador");
d.speak(); // Rocky barks.

// Under the hood:

// Dog.prototype.__proto__ = Animal.prototype;
// That’s how inheritance works!

// 🔍 7. Prototype vs __proto__
// 1. prototype=>Belongs to constructor functions/classes — used to define methods for instances.
//2. __proto__=>Belongs to instances — points to their constructor’s prototype.

function Person(name) {
  this.name = name;
}

console.log(Person.prototype); // object shared by instances
const p = new Person("Santraj");
console.log(p.__proto__ === Person.prototype); // true

// 🧩 8. Custom Prototype Chain Example
const vehicle = {
  drive() {
    console.log("Driving...");
  },
};

const car = Object.create(vehicle);
car.honk = function () {
  console.log("Beep!");
};

const tesla = Object.create(car);
tesla.drive(); // Driving...
tesla.honk(); // Beep!

// tesla → car → vehicle → Object.prototype → null

// 🧠 9. Why Prototype Inheritance is Powerful
// Memory-efficient (shared methods)
// Enables method overriding
// Allows easy code reuse
// Foundation for frameworks like React, Node.js core internals, etc.

// ⚠️ 10. Common Interview Traps
// ❌ Mistake 1:

function Person(name) {
  this.name = name;
}
const p1 = new Person("Santu");
const p2 = new Person("Raj");

p1.sayHi = function () {
  console.log("Hi!");
};

p2.sayHi(); // ❌ Error (p2 doesn’t have sayHi)
// ✅ Fix: define method on prototype.
Person.prototype.sayHi = function () {
  console.log("Hi!");
};

// ❌ Mistake 2:
// Confusing prototype and __proto__.
instance.__proto__ === Constructor.prototype;

// 🧩 Summary
// Prototype=>Object that provides shared properties/methods.
// Prototype Chain=>Chain of linked objects used for inheritance lookup.
// Constructor Function=>Used to create objects with shared prototype.
//Class (ES6)=>Cleaner syntax for prototype-based inheritance.
// extends & super=>Used for class inheritance and parent access.
