// The event loop is the mechanism that allows JavaScript (which is single-threaded) to perform non-blocking asynchronous operations — like handling promises, timeouts, and I/O — without blocking the main thread.

// It’s what makes JavaScript appear concurrent even though it has only one main thread.

// JavaScript executes code synchronously (line by line) in the call stack,
// and defers asynchronous tasks (like setTimeout, fetch, etc.) to the callback queue or microtask queue,
// which are processed by the event loop when the call stack is empty.

// 🧩 Event Loop Flow (Simplified):
// 1.Call Stack — Executes your main synchronous code.
// 2.Web APIs — Handle async operations (like timers, DOM events, fetch).
// 3.Callback Queue — Stores callbacks (like from setTimeout).
// 4.Microtask Queue — Stores promise callbacks (.then, catch).
// 5.Event Loop — Constantly checks:
// If the call stack is empty → executes microtasks first → then tasks from callback queue.

console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("timeout in promise"), 0);
});

console.log("end");

// start
// end
// promise1
// timeout1
//promise in timeout
//timeout in promise

console.log("first");
Promise.resolve(console.log("2"));
console.log("last");

//first
//2
//last

console.log("fisrt");
const promise = new Promise((resolve, reject) => {
  console.log("hello-1");
  resolve();
  console.log("hello-2");
});

promise
  .then((data) => console.log("fisrt", data))
  .then((data) => console.log("last", data));
console.log("last");

// fisrt
// hello-1
// hello-2
// last
// fisrt undefined
// last undefined

let a = true;

setTimeout(function () {
  a = false;
}, 2000);

while (a) {
  console.log("inside loop");
}

// infinite loop of inside loop due to call stack wont empty that's why callback wont get executed

console.log("A");
async function myFunction() {
  return await new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log("hello");
      resolve();
    }, 2000);
  });
}

(async () => {
  await myFunction();
  console.log("B"); // Now this waits for the async operation
})();

// A, Hello, B

console.log("A");

async function myFun() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise resolved");
    });
  });
}

(async () => {
  await myFun().then((data) => console.log(data));
  console.log("B");
})();

// A, promise resolved, B
