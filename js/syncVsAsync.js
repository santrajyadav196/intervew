// JavaScript is single-threaded, meaning it executes one statement at a time in the main thread.

// But it can still perform asynchronous tasks using the event loop, callback queue, and Web APIs.

// 🟩 1️⃣ Synchronous JavaScript
// Code runs line by line, in sequence.
// Each operation waits for the previous one to complete.
// If one task takes long, the entire program blocks.

// Example:
console.log("Start");

function task() {
  for (let i = 0; i < 3e9; i++) {} // long task
  console.log("Task done");
}

task();
console.log("End");
// 🧾 Output:
// Start
// Task done
// End

// 👉 The task() blocks everything — browser becomes unresponsive until it finishes.

// 🟦 2️⃣ Asynchronous JavaScript
// Doesn’t wait for one task to finish before moving to the next.
// Uses callbacks, promises, async/await to handle results later.
// Long tasks are delegated to Web APIs, freeing the main thread.

// Example:

console.log("Start");

setTimeout(() => {
  console.log("Async Task done");
}, 2000);

console.log("End");

// 🧾 Output:

// Start
// End
// Async Task done

// 👉 setTimeout is handled by the browser Web API, and its callback executes later, after the main code finishes.

// ⚙️ How it works internally
// JavaScript engine executes synchronous code first (in the Call Stack).

// Asynchronous code is sent to Web APIs (like setTimeout, fetch, etc.).

// When done, callbacks go to the Callback Queue.

// Event Loop checks if the stack is empty → pushes queued callbacks to run.
