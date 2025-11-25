// 🧠 What is OOP (Object-Oriented Programming)?

// OOP is a programming paradigm that organizes code into objects — each object represents a real-world entity with properties (data) and methods (behavior).

// In simple terms:

// OOP = Data (properties) + Functions (methods) packed together as an object.

// ⚙️ 4 Pillars of OOP in JavaScript

// Let’s break them one by one with examples 👇

// 1. Encapsulation (Data Hiding)

// Definition:
// Encapsulation means binding data and methods together inside one unit (object/class) and restricting direct access to some parts of it.

// In JavaScript, we can achieve this using closures or private fields (#).

// ✅ Example (using closures)

function BankAccount(owner, balance) {
  let _balance = balance; // private variable

  return {
    deposit(amount) {
      _balance += amount;
      console.log(`Deposited ${amount}`);
    },
    getBalance() {
      return _balance; // controlled access
    },
  };
}

const account = BankAccount("Santraj", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
console.log(account._balance); // ❌ undefined (private)

// ✅ Example (using private class fields)
class BankAccount {
  #balance = 0; // private field

  constructor(balance) {
    this.#balance = balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount(1000);
acc.deposit(200);
console.log(acc.getBalance()); // 1200
// console.log(acc.#balance); // ❌ Error: Private field

// 👉 Why important: Helps in data security and controlled access.

// 2. Abstraction (Hiding Complexity)

// Definition:
// Abstraction means hiding internal implementation details and showing only the required features.

// ✅ Example:
class Car {
  start() {
    this.#igniteEngine();
    console.log("Car started");
  }

  #igniteEngine() {
    console.log("Engine ignited"); // internal detail
  }
}

const car = new Car();
car.start(); // ✅ works
// car.#igniteEngine(); // ❌ not accessible (private)

// 👉 The user just calls car.start(), but doesn’t need to know how #igniteEngine() works internally.

// 3. Inheritance (Reusability)

// Definition:
// Inheritance allows one class to inherit properties and methods from another class — avoiding code duplication.

// ✅ Example:

class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name); // call parent constructor
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying`);
  }
}

const s1 = new Student("Santraj", "A");
s1.greet(); // from parent
s1.study(); // from child

// 👉 Student inherits from Person.

// 4. Polymorphism (Many Forms)

// Definition:
// Polymorphism means the same method name behaves differently depending on the object calling it.

// ✅ Example:

class Animal {
  makeSound() {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Bark!");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Meow!");
  }
}

const animals = [new Dog(), new Cat(), new Animal()];
animals.forEach((a) => a.makeSound());
// Output:
// Bark!
// Meow!
// Some generic sound

// Here, makeSound() behaves differently for each subclass.

// 🔥 Bonus Concepts in OOP (JS-specific)
// 1. Constructor Function (Before Classes)

function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(`Hello, I am ${this.name}`);
};

const p1 = new Person("Santraj");
p1.greet();

// 2. Prototype Inheritance

// Every object in JS inherits from its prototype chain:

const obj2 = { a: 1 };
console.log(obj2.__proto__ === Object.prototype); // true

// 3. Static Methods

// Methods that belong to the class, not instances:

class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtils.add(2, 3)); // 5

//Extra from my side

class Person {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  sayHello() {
    return `Hello, I am ${this.name}, whose email address is ${this.email} and phone number is ${this.phone}`;
  }
}

class Employee extends Person {
  constructor(name, email, phone, position) {
    super(name, email, phone); // ✅ now passes required values to Person so that we can initial contruction in person class
    this.position = position;
  }

  getRole() {
    return `${this.name} works as ${this.position}`;
  }
}

const emp = new Employee(
  "Santu",
  "santraj.yadav@example.com",
  "8303788783",
  "Developer"
);

console.log(emp.sayHello()); // Inherited from Person
console.log(emp.getRole()); // Defined in Employee

class MinStack {
  constructor() {
    this.stack = []; // main stack
    this.minStack = []; // stack to keep track of minimums
  }

  push(val) {
    this.stack.push(val);
    // push to minStack if empty or current val <= current min
    if (
      this.minStack.length === 0 ||
      val <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    // if popped value is the current minimum, pop from minStack too
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// Example usage
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top()); // 0
console.log(minStack.getMin()); // -2

var MinStack = function () {
  this.stack = []; // main stack
  this.minStack = []; // stack to keep track of minimums
};

MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (
    this.minStack.length === 0 ||
    val <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(val);
  }
};

MinStack.prototype.pop = function () {
  const val = this.stack.pop();
  if (val === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

var obj = new MinStack();
obj.push(-2);
obj.push(0);
obj.push(-3);
console.log(obj.getMin()); // -3
obj.pop();
console.log(obj.top()); // 0
console.log(obj.getMin()); // -2
