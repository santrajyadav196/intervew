// A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

// Think of it like a placeholder for a value that you don’t have yet, but will get in the future.

// 🔹 Promise States

// 1.Pending=>The operation is still running
// 2.Fulfilled=>The operation completed successfully
// 3.Rejected=>The operation failed

// 💻 Example

const fetchData = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("✅ Data fetched successfully!");
    } else {
      reject("❌ Failed to fetch data!");
    }
  }, 2000);
});

fetchData
  .then((data) => console.log(data)) // runs on success
  .catch((err) => console.log(err)) // runs on failure
  .finally(() => console.log("Done!")); // always runs

//   🧾 Output (after 2s):
// ✅ Data fetched successfully!
// Done!

// ⚙️ Promise Methods

// 🟩 1. then()
// 👉 Used to handle the resolved (fulfilled) value of a Promise.

const promise = new Promise((resolve) => {
  setTimeout(() => resolve("✅ Task done!"), 1000);
});

promise.then((result) => {
  console.log(result); //✅ Task done!
});

// Notes:
// .then() also returns a new Promise, so you can chain them:

promise
  .then((data) => data + " Step 1")
  .then((data) => data + " Step 2")
  .then(console.log); //✅ Task done! Step 1 Step 2

// 🟥 2. catch()
// 👉 Used to handle errors (rejections) in a Promise chain.

const promise2 = new Promise((_, reject) => {
  setTimeout(() => reject("❌ Something went wrong"), 1000);
});

promise2.then((res) => console.log(res)).catch((err) => console.error(err)); //❌ Something went wrong

// 💡 Note:
// If any .then() above throws an error, it’s automatically caught by .catch() below.

// 🟦 3. finally()
// 👉 Runs no matter what — whether the promise resolves or rejects.
// Useful for cleanup (like hiding loaders, closing connections, etc.)

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("❌ Failed"), 1000);
});

promise3
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("🧹 Cleanup complete!"));

// output:-
//   ❌ Failed
// 🧹 Cleanup complete!

// 🟨 4. Promise.all()

// 👉 Waits for all promises to resolve or rejects immediately if any one fails.

const p1 = Promise.resolve("✅ User fetched");
const p2 = Promise.resolve("✅ Posts fetched");
const p3 = Promise.reject("❌ Comments failed");

Promise.all([p1, p2, p3]).then(console.log).catch(console.error);

// 🧾 Output:
// ❌ Comments failed

// If even one promise rejects, the whole .all() rejects — fail fast behavior.

// ✅ If all succeed:
Promise.all([p1, p2]).then(console.log); // [ '✅ User fetched', '✅ Posts fetched' ]

// 🟩 5. Promise.allSettled()

// 👉 Waits for all promises to finish — no matter success or failure.
// Returns an array of result objects with {status, value} or {status, reason}.

const p4 = Promise.resolve("✅ Success");
const p5 = Promise.reject("❌ Failed");

Promise.allSettled([p4, p5]).then(console.log);

// Output:-

// [
//   { status: "fulfilled", value: "✅ Success" },
//   { status: "rejected", reason: "❌ Failed" },
// ];

// 💡 Common use: APIs where partial failure is okay (e.g., fetching multiple user profiles).

// 🟦 6. Promise.race()
// 👉 Resolves or rejects as soon as the first promise settles (whether success or failure).

const p6 = new Promise((res) => setTimeout(res, 3000, "🐢 Slow"));
const p7 = new Promise((res) => setTimeout(res, 1000, "⚡ Fast"));

Promise.race([p1, p2]).then(console.log);

// 🧾 Output:
// ⚡ Fast

// 💡 Common use: timeout wrappers — e.g., cancel an API call if it takes too long.

// 🟨 7. Promise.any()
// 👉 Resolves when any promise fulfills (ignores rejections).
// Rejects only if all promises fail.

const p8 = Promise.reject("❌ API 1 failed");
const p9 = Promise.reject("❌ API 2 failed");
const p10 = Promise.resolve("✅ API 3 success");

Promise.any([p8, p9, p10]).then(console.log).catch(console.error);

// 🧾 Output:
// ✅ API 3 success

// If all reject:
Promise.any([p8, p9]).catch((err) => console.error(err.errors));

//🧾 Output:
// ["❌ API 1 failed", "❌ API 2 failed"];
