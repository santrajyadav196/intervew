// 🔹 1. What Are Modules?

// A module is just a file that contains reusable code (functions, variables, classes) which can be imported into other files.

// Modules help you:
// Organize large projects into smaller pieces
// Avoid global variable pollution
// Control access (public/private)
// Reuse code across multiple files

// 🔹 2. Two Main Types of Modules

// 1. CommonJS (CJS)=>Node.js (default before ES Modules)=>require() / module.exports=>Used in Node.js
//2. ES Modules (ESM)=>Modern JS (browser & Node.js ≥ v14)=>Used in modern apps

// 🧩 CommonJS (CJS)

// Used in Node.js before ES Modules.

// Example 1 — math.js

// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };

// Example 2 — app.js
// app.js
const math = require("./math");
console.log(math.add(5, 3)); // 8

// 🧠 Behind the scenes:
// Node wraps your code in a function:
// (function(exports, require, module, __filename, __dirname) { ... })

// So require() is synchronous (runs top to bottom).

// ✅ Good for: Node.js apps
// ❌ Not supported in browser natively

// 🧩 ES Modules (ESM)
// Introduced in ES6 (2015) and now fully supported in browsers and Node.js.

// Example 1 — math.mjs

// math.mjs
export const add2 = (a, b) => a + b;
export const subtract2 = (a, b) => a - b;

// app.mjs
import { add2, subtract2 } from "./math.mjs";
console.log(add2(10, 5)); // 15

// ✅ Good for: Browser and modern Node.js
// ✅ Supports tree-shaking (only imports what you use)
// ✅ Asynchronous loading

// 🔹 3. Different Export Styles
// 1️⃣ Named Export

// You can export multiple things:
export const a = 10;
export const b = 20;
export function greet() {
  return "Hello";
}

// Usage:
import { a, b, greet } from "./file.js";

// 2️⃣ Default Export

// Only one default export per file.
export default function greet() {
  return "Hi!";
}

// Usage:
import greet from "./file.js";

// You can rename during import:
import greetFunction from "./file.js";

// 3️⃣ Mixed Export (rare but valid)
export const name = "Santraj";
export default function sayHello() { console.log("Hello!"); }

// 🔹 4. Dynamic Imports (Lazy Loading)

// You can import a module dynamically when needed — good for performance.

async function loadMath() {
  const math = await import('./math.js');
  console.log(math.add(2, 3));
}
loadMath();

// ✅ Used in React lazy loading, code-splitting, etc.

// 🔹 6. Using ES Modules in Node.js

// To enable ES Modules in Node:

// Either use .mjs extension

// Or in package.json:
// {
//   "type": "module"
// }

// Then:

import { add } from './math.js';
