// 🔹 1. What is Memory Management?

// JavaScript automatically allocates memory when objects are created and frees it when they are no longer used.

// This process is called automatic garbage collection.

// But — as a developer, you must understand how memory is managed to avoid memory leaks, especially in long-running apps (like SPAs or Node.js servers).

// 🔹 2. Memory Lifecycle

// Every variable or object goes through 3 stages:
// 1. Allocation=> JS allocates memory when you declare variables or create objects.
// 2. Use=>The program reads/writes to the variable (active use).
// 3. Release (Deallocation)=>When data is no longer reachable, it can be freed (garbage collected).

// Example:

function processData() {
  let data = { name: "Santraj" }; // 🧩 Allocated
  console.log(data.name); // 📘 Used
  data = null; // ❌ Eligible for Garbage Collection
}

// 🔹 3. Garbage Collection Mechanism
// JavaScript engines (like V8) use mark-and-sweep algorithm.

// ⚙️ How Mark-and-Sweep Works:

// Roots: Global objects like window or global are roots.

// The GC marks all objects reachable from roots.
// Unreachable objects (not referenced by anything) are collected.

//Example:-
let user = { name: "Ravi" };
let another = user; // same object reference
user = null; // still referenced by another
// not garbage collected yet
another = null; // now unreachable → collected

// 🔹 4. Memory Leaks — Common Causes
// Even though GC runs automatically, memory leaks can still happen if you keep unnecessary references alive.

// 💣 Common Causes:
// 1.Global variables
function foo() {
  leak = "I am global!"; // forgot 'let' or 'const'
}

//2.Event listeners not removed
const btn = document.getElementById("clickMe");
function handleClick() {
  console.log("Clicked");
}
btn.addEventListener("click", handleClick);
// ❌ Not removing event listener → memory leak

//3. Closures holding references
function outer() {
  const bigArray = new Array(100000).fill("data");
  return function inner() {
    console.log(bigArray.length);
  };
}

const ref = outer(); // bigArray never collected until ref = null

//4. Detached DOM elements
let el = document.getElementById("myDiv");
el.remove(); // removed from DOM but still in memory if referenced

// 🔹 5. WeakMap and WeakSet — Special Memory-Safe Collections

// These are like Map and Set, but they don’t prevent garbage collection.
// They hold “weak” references — meaning, if the object is no longer used elsewhere, it’s automatically removed.

// 🧩 WeakMap Example

let weakMap = new WeakMap();
let user2 = { name: "Santraj" };

weakMap.set(user2, "Some data");
console.log(weakMap.has(user2)); // true

user2 = null; // user object now eligible for GC
// 🧹 Automatically removed from WeakMap

// ✅ Use Case:
// Caching metadata for objects without preventing GC.

// 🧩 WeakSet Example

let ws = new WeakSet();
let obj = { id: 1 };

ws.add(obj);
console.log(ws.has(obj)); // true

obj = null; // object auto-removed when GC runs

// ✅ Use Case:
// Track object existence without keeping them alive in memory.

// 🔹 6. Memory Profiling (in Browser DevTools)

// You can check memory usage and leaks:

// Open Chrome DevTools → Performance or Memory tab
// Take Heap Snapshots before & after interactions
// Compare retained objects → detect leaks

// 🔹 7. Best Practices to Avoid Leaks
// ✅ Always removeEventListener() when elements are removed
// ✅ Set unused references to null
// ✅ Avoid global variables
// ✅ Use WeakMap or WeakSet for temporary object tracking
// ✅ Use closure carefully
// ✅ Use profiling tools regularly
