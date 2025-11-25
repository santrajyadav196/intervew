// ⚡ Debouncing and Throttling in JavaScript

// These two are performance optimization techniques used to control how often a function is executed, especially for high-frequency events like:
// 1.scroll
// 2.resize
// 3.keyup / input
// 4.mousemove;

// 🧠 1️⃣ The Problem: Too Many Function Calls
// Let’s say you attach an event listener:
window.addEventListener("resize", () => {
  console.log("Resized!");
});

// 👉 Every single pixel resize triggers a new event — possibly hundreds of times per second.
// That causes:
//1. Performance issues
// 2.Lag in UI
// 3.Unnecessary computations

// 🕒 2️⃣ Debouncing
// Debounce ensures that a function runs only after a certain period of inactivity.

// It “waits” for the user to stop triggering the event.

const debounce = (fn, delay) => {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const newFun = (msg) => {
  console.log(msg);
};

const deFun = debounce(newFun, 1000);
deFun("hello");

// ⚙️ 3️⃣ Throttling

// Throttle ensures a function runs at most once every X milliseconds, even if the event happens many times.

// It doesn’t “wait” — it just limits the frequency.

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...arg) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      fn.apply(this, arg);
      lastCall = now;
    }
  };
}
// Test
function sayHello(msg) {
  console.log(msg, new Date().toLocaleTimeString());
}

const throttled = throttle(sayHello, 2000000);

throttled("Call 1"); // Executes immediately
throttled("Call 2"); // Ignored (within 2s)
throttled("Call 3"); // Ignored (within 2s)

setTimeout(() => throttled("Call 4"), 2500); // Executes (after 2s)
