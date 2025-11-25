// 🧠 1️⃣ Object.freeze()

// 🔹 Purpose:

// Makes an object completely immutable —
// you cannot add, delete, or modify any property.

const user = { name: "Santraj", age: 25 };
Object.freeze(user);

user.age = 30; // ❌ No effect
user.city = "Delhi"; // ❌ Cannot add new
delete user.name; // ❌ Cannot delete

console.log(user); // { name: "Santraj", age: 25 }

// ⚙️ What Actually Happens:

// Properties become non-writable and non-configurable.

// It’s shallow — nested objects are not frozen.

// 🧩 Example (Nested):

const person = {
  name: "Ravi",
  address: { city: "Mumbai" },
};
Object.freeze(person);

person.address.city = "Pune"; // ✅ Still works! (nested not frozen)
console.log(person.address.city); // Pune

// 🧠 To deep-freeze:

function deepFreeze(obj) {
  Object.freeze(obj);
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  }
}

// ✅ Use when you need true immutability (e.g., Redux state).

// 🧠 2️⃣ Object.seal()

// 🔹 Purpose:

// Prevents adding or deleting properties,
// but allows modifying existing values.

const car = { brand: "Tesla", model: "X" };
Object.seal(car);

car.model = "S"; // ✅ Can modify
car.color = "Red"; // ❌ Cannot add
delete car.brand; // ❌ Cannot delete

console.log(car); // { brand: "Tesla", model: "S" }

// 🧠 3️⃣ Object.assign()

// 🔹 Purpose:

// Copies properties from one or more source objects to a target object.
// Used for cloning or merging.

// 📘 Example:

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }

// 💡 Note:

// It mutates the target object.
// It performs a shallow copy (nested references are shared).

// 🧩 Shallow Copy Example:
const obj1 = { a: 1, b: { c: 2 } };
const clone = Object.assign({}, obj1);

clone.b.c = 99;
console.log(obj1.b.c); // 99 😱 (same reference)

// ✅ Use spread for same effect:

const clone = { ...obj1 };
