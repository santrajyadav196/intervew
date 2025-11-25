// All three — call, apply, and bind — are methods available on functions that allow you to manually set the value of this when calling a function.

// They’re used to borrow methods from one object and use them with another object.

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

// 1. call() — Call Immediately

// Invokes the function immediately, with this set to the provided object.
// You pass arguments individually.

greet.call(person1, "Hello", "!"); // Hello, Alice!
greet.call(person2, "Hi", "!!"); // Hi, Bob!!

// 2. apply() — Call Immediately with Array Arguments

// Almost same as call(), but it expects arguments as an array.

greet.apply(person1, ["Good morning", "!"]); // Good morning, Alice!
greet.apply(person2, ["Hey", "!!"]); // Hey, Bob!!

// 3. bind() — Returns a New Function

// Does not execute the function immediately.
// Returns a new function with this permanently bound to the provided object.

const greetAlice = greet.bind(person1, "Hello");
greetAlice("!"); // Hello, Alice!

// Example: Borrowing Methods

const user1 = {
  name: "Santraj",
  showInfo(age) {
    console.log(`${this.name} is ${age} years old`);
  },
};

const user2 = { name: "Yadav" };

user1.showInfo.call(user2, 25); // Yadav is 25 years old

// ✅ Here, user2 borrows showInfo from user1 using call().

// Example: bind() in Event Listeners

const button = document.getElementById("myBtn");

const user = {
  name: "Santraj",
  clickHandler() {
    console.log(`Hello ${this.name}`);
  },
};

button.addEventListener("click", user.clickHandler.bind(user));
// Without .bind(user), this inside clickHandler would refer to the button element, not the user object.

// 💡 Common Interview Trick Question
const obj = { name: "Alice" };

function sayHello() {
  console.log(`Hello, ${this.name}`);
}

const greet1 = sayHello.bind(obj);
greet1(); // Hello, Alice

const greet2 = sayHello.bind({ name: "Bob" });
greet1.call({ name: "Charlie" }); // Hello, Alice ❗ not Charlie

// ✅ Once a function is bound using bind, you cannot change its this using call or apply.

// Use bind() when you want to preserve this context for later use — like in callbacks, event listeners, or setTimeout.

// 1. Basic Example — Borrowing Methods

const user3 = {
  name: "Santraj",
  greet: function (city, country) {
    console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
  },
};

const user4 = {
  name: "Yadav",
};

// Now, user4 doesn’t have the greet method, but we can borrow it using:

// ✅ Using call()

user1.greet.call(user2, "Mumbai", "India");
// Hi, I'm Yadav from Mumbai, India

// ✅ Using apply()

user1.greet.apply(user2, ["Delhi", "India"]);
// Hi, I'm Yadav from Delhi, India

// ✅ Using bind()

const greetYadav = user1.greet.bind(user2, "Pune", "India");
greetYadav();
// Hi, I'm Yadav from Pune, India

// 💡 Key Difference:
// call() → executes immediately
// apply() → executes immediately with array
// bind() → returns a new function to call later

//🧩 2. Borrowing Methods from Built-in Objects
// Suppose you have an array-like object (not a real array):

const numbers = {
  0: 10,
  1: 20,
  2: 30,
  length: 3,
};

// Now you can borrow Array methods using call or apply:
const maxNum = Math.max.apply(null, [10, 20, 30]); // ✅ 30
console.log(maxNum);

// Or using call with array-like object:

console.log(Array.prototype.slice.call(numbers)); // [10, 20, 30]

// ✅ Here, we are “borrowing” the slice method of an array to convert an array-like object into a real array.

// 🧩 3. call() for Reusing Functions
// You can use call() to reuse generic functions across objects.

function showDetails() {
  console.log(`${this.firstName} ${this.lastName}`);
}

const userA = { firstName: "Santraj", lastName: "Yadav" };
const userB = { firstName: "Rahul", lastName: "Sharma" };

showDetails.call(userA); // Santraj Yadav
showDetails.call(userB); // Rahul Sharma

// 🧩 4. apply() for Dynamic Arguments

function introduce(city, country) {
  console.log(`${this.name} lives in ${city}, ${country}`);
}

const person3 = { name: "Alice" };
const details = ["New York", "USA"];

introduce.apply(person3, details);
// Alice lives in New York, USA

// 🧩 5. bind() to Preserve this in Asynchronous Code

const person4 = {
  name: "Santraj",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
  delayedGreet() {
    setTimeout(function () {
      console.log(`Hi, ${this.name}`); // ❌ 'this' lost here
    }, 1000);
  },
};

person4.delayedGreet(); // Hi, undefined

// Why undefined?
// Because this inside setTimeout refers to the global object, not person.

// ✅ Fix it with bind():

const person5 = {
  name: "Santraj",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
  delayedGreet() {
    setTimeout(
      function () {
        console.log(`Hi, ${this.name}`);
      }.bind(this),
      1000
    ); // ✅ binds 'this' permanently
  },
};

person5.delayedGreet(); // Hi, Santraj

// 🧩 8. Real Example — Borrowing from Objects

const car = {
  brand: "Tesla",
  getInfo(speed) {
    console.log(`${this.brand} is running at ${speed} km/h`);
  },
};

const bike = { brand: "Royal Enfield" };

// borrow `getInfo` from car
car.getInfo.call(bike, 120); // Royal Enfield is running at 120 km/h
car.getInfo.apply(bike, [100]); // Royal Enfield is running at 100 km/h

const bikeInfo1 = car.getInfo.bind(bike, 150);
bikeInfo1(); // Royal Enfield is running at 150 km/h

const bikeInfo2 = car.getInfo.bind(bike);
bikeInfo2(150); // Royal Enfield is running at 150 km/h

// 🧠 Question 1: Borrowing Methods Between Objects
const car2 = {
  brand: "Tesla",
  showDetails(speed, unit) {
    console.log(`${this.brand} runs at ${speed} ${unit}.`);
  },
};

const bike2 = { brand: "Yamaha" };

car2.showDetails.call(bike2, 120, "km/h"); // ✅ using call
car2.showDetails.apply(bike2, [120, "km/h"]); // ✅ using apply

// 🧠 Question 2: Using bind() in Event Handling
const user5 = {
  name: "Santraj",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const button2 = document.getElementById("login-btn");
button.addEventListener("click", user5.greet);

// When you click the button, it prints:
Hello, undefined;

// 👉 Why? And how can you fix it using bind()?

// Answer:
// Because when the event handler runs, this refers to the button element, not the user object.

// Fix:
button2.addEventListener("click", user5.greet.bind(user5));

// 🧠 Question 4: Permanent Binding with bind()
const user6 = { name: "Alice" };

function greet() {
  console.log(`Hi ${this.name}`);
}

const boundGreet = greet.bind(user6);
boundGreet(); // Hi Alice

boundGreet.call({ name: "Bob" }); // Hi Alice

// ⚡ Bonus Challenge Question

const obj2 = {
  name: "Santraj",
  greet() {
    console.log(this.name);
  },
};

setTimeout(obj2.greet, 1000); // undefined
setTimeout(obj.greet.bind(obj), 1000); //Santraj

const person = {
  name: "Santraj",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};

const greetFn = person.greet;
greetFn(); //undefined

// You are copying the function reference, not the object context.
// So when greetFn() runs, this refers to the global object (or undefined in strict mode), not person.

// Fix using bind()
const greetFn2 = person.greet.bind(person);
greetFn2(); // ✅ Hello, Santraj

person.greet.call(person); // Hello, Santraj
person.greet.apply(person); // Hello, Santraj

// 🧩 Question 2

// What will be the output of this code, and how can you fix it?

const user7 = {
  name: "Santraj",
  showName() {
    console.log(this.name);
  },
};

setTimeout(user7.showName, 1000);

// 1️⃣ Output
// undefined

// 2️⃣ Why it happens

// When you pass user.showName directly to setTimeout, you are not calling it immediately —
// you’re passing a reference to the function.

// So when setTimeout executes it after 1 second, the function runs detached from the object.
// Hence, this inside showName() points to:

// The global object (window in browser, global in Node), or

// undefined (if you’re in strict mode).

// So, this.name → undefined.

// 3️⃣ Fix using bind()

setTimeout(user.showName.bind(user), 1000); // Santraj

// ✅ This permanently binds this to user, so the output is:
//Santraj

// 💡 Alternative Fixes
// ✅ Using an arrow function:

setTimeout(() => user.showName(), 1000);

// Arrow functions don’t have their own this;
// they inherit this from their surrounding scope — so user.showName() keeps the right context.

// ✅ Using a wrapper function:

setTimeout(function () {
  user.showName();
}, 1000);

// 🔹 Another key example:

// Let’s compare arrow vs normal function in nested contexts 👇

const person6 = {
  name: "Santraj",
  sayHello() {
    setTimeout(function () {
      console.log("Normal:", this.name); // ❌ undefined
    }, 500);

    setTimeout(() => {
      console.log("Arrow:", this.name); // ✅ Santraj
    }, 1000);
  },
};

person6.sayHello();

// 🔍 Why?

// Inside the normal function, this belongs to setTimeout → global scope.

// Inside the arrow function, this is inherited from the surrounding scope → sayHello() → person.

// 🧩 Question 3

// You’re given the following code:

const employee = {
  name: "Santraj",
  position: "Developer",
  showDetails(city, country) {
    console.log(
      `${this.name} works as a ${this.position} in ${city}, ${country}`
    );
  },
};

const student = {
  name: "Ravi",
  position: "Student",
};

// 👉 You need to:

// Use call to make student borrow showDetails and log:

// Ravi works as a Student in Mumbai, India

// Use apply to achieve the same result (but arguments as an array).

// Use bind to create a permanent function for student,
// and call it later to print the same output.

employee.showDetails.call(student, "Mumbai", "India");
employee.showDetails.call(student, ["Mumbai", "India"]);
const fn1 = employee.showDetails.bind(student, "Mumbai", "India");
fn1(); // ✅ Works fine

const fn2 = employee.showDetails.bind(student);
fn2("Mumbai", "India"); // ✅ Works fine too

// 🧩 Question 4 — Predict the Output

function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person7 = { name: "Santraj" };
const person8 = { name: "Ravi" };

const boundGreet2 = greet.bind(person7, "Hello");

// Case 1:
boundGreet("!"); //Hello, Santraj!

// Case 2:
boundGreet.call(person8, "?"); //Hello, Santraj?

// Case 3:
boundGreet.apply(person8, ["!!"]); //Hello, Santraj!!
// Once a function is bound using bind(),
// its this cannot be changed — not even with call(), apply(), or another bind().
