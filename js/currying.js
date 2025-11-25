// Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking one argument at a time.

// 🔹 Simple Example:
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

// ✅ Curried Version:

function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(2)(3)); // 5

// Here, add(2) returns a function waiting for b.
// Then add(2)(3) executes both steps to produce the result.

// 🧩 2. Why is Currying Useful?

// Currying helps to:

// Reuse functions with preset arguments (partial application)
// Increase code readability
// Make functions more flexible and modular

// 💡 Example — Partial Application

function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2); // pre-fix a = 2
console.log(double(5)); // 10
console.log(double(10)); // 20

// ⚙️ 3. Currying with Arrow Functions
// You can write currying in a cleaner ES6 style:

const add = (a) => (b) => (c) => a + b + c;

console.log(add(2)(3)(4)); // 9

// Here each function takes one parameter and returns another function until all arguments are supplied.

// 📦 4. Real-World Example — Logging Utility

// Let’s say you need different types of loggers (info, error, warn):

function log(level) {
  return function (message) {
    console.log(`[${level.toUpperCase()}]: ${message}`);
  };
}

const info = log("info");
const error = log("error");

info("Server started successfully.");
error("Database connection failed.");

// ✅ Output:
// [INFO]: Server started successfully.
// [ERROR]: Database connection failed.

// 🔄 5. Real-World Example — API Request Builder

function apiRequest(baseUrl) {
  return function (endpoint) {
    return function (id) {
      return `${baseUrl}/${endpoint}/${id}`;
    };
  };
}

const getUser = apiRequest("https://api.example.com")("users");
console.log(getUser(101)); // https://api.example.com/users/101

// ✅ This pattern helps in building modular and reusable functions for APIs.

// ⚠️ 8. Common Interview Trick
// ❓Question:

// What’s the output?

function sum(a) {
  return function (b) {
    if (b) return sum(a + b);
    return a;
  };
}

console.log(sum(1)(2)(3)(4)()); // 10
