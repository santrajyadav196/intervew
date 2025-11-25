// When you copy an object in JavaScript, you’re often not copying the values, but the references (pointers to the same memory).

// That’s where shallow copy and deep copy come in.

// 🧩 2️⃣ Shallow Copy

// A shallow copy only copies the first level of the object.
// Nested objects or arrays still share the same reference in memory.

// 📘 Example:

const user = {
  name: "Santraj",
  address: {
    city: "Delhi",
    country: "India",
  },
};

// Shallow copy
const copy = { ...user };

copy.name = "Ravi"; // ✅ changes only copy
copy.address.city = "Mumbai"; // ⚠️ changes both

console.log(user.address.city); // Mumbai 😱

// ⚙️ Why it happens:

// The spread operator (...) or Object.assign() only clones top-level properties.

// Nested objects are still references to the original memory.

// Shallow copy methods:-

//1. Object.assign() => Same as spread
//2. Array.slice() / Array.concat()=>Works for 1D arrays
//3. Array.from()=>Same as slice for arrays

// 🧠 3️⃣ Deep Copy

// A deep copy clones the object recursively —
// all nested objects/arrays are copied by value, not by reference.

// 📘 Example (Deep Copy)

const user2 = {
  name: "Santraj",
  address: {
    city: "Delhi",
    country: "India",
  },
};

// Deep copy using JSON method
const deepCopy = JSON.parse(JSON.stringify(user2));

deepCopy.address.city = "Mumbai";

console.log(user.address.city); // Delhi ✅
console.log(deepCopy.address.city); // Mumbai ✅

// ⚙️ How it works

// JSON.stringify() converts object → string.

// JSON.parse() converts string → new object in memory.

// ✅ All nested levels are new objects
// ❌ But it doesn’t handle:

// Functions

// undefined

// Date, Map, Set, or circular references

// 📘 Example (Advanced Case)
const data = {
  name: "Santraj",
  date: new Date(),
  greet: function () {
    console.log("Hello!");
  },
};

const deepCopy = JSON.parse(JSON.stringify(data));

console.log(deepCopy.date); // string (not Date)
console.log(deepCopy.greet); // undefined 😢

// 🧩 Better Deep Copy Methods (Modern)
// 1️⃣ Using structuredClone() (✅ best modern way)

const user3 = {
  name: "Santraj",
  address: { city: "Delhi" },
  hobbies: ["music", "coding"],
};

const deepCopy = structuredClone(user3);
deepCopy.address.city = "Mumbai";

console.log(user.address.city); // Delhi ✅

// ✅ Handles nested objects
// ✅ Handles Date, Map, Set, ArrayBuffer
// ❌ Fails for functions and DOM nodes
