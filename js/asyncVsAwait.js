// async and await are syntactic sugar built on top of Promises.
// They make asynchronous code look and behave more like synchronous code — easier to read and debug.

// 🟩 1️⃣ async keyword
// Declares a function that always returns a Promise.
// If you return a value, it’s automatically wrapped inside a Promise.

// Example:
async function greet() {
  return "Hello Santraj!";
}

greet().then(console.log);
// Output: Hello Santraj!

// Even though we just return a string, it behaves like:
Promise.resolve("Hello Santraj!");

// 🟦 2️⃣ await keyword
// Can be used only inside async functions.
// It pauses the execution of the async function until the Promise is resolved/rejected.
// Makes asynchronous code look synchronous.

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("✅ Data fetched"), 2000);
  });
}

async function fetchData() {
  console.log("Fetching...");
  const result = await getData(); // waits here
  console.log(result);
  console.log("Done!");
}

fetchData();

// Output (after 2s):
// Fetching...
// ✅ Data fetched
// Done!

// 🧩 3️⃣ Error handling with try...catch
// You can handle errors just like synchronous code — no need for .catch() chaining.

async function fetchUser() {
  try {
    const user = await Promise.reject("❌ Failed to fetch user");
    console.log(user);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Cleanup done");
  }
}

fetchUser();

// 🧾 Output:
// ❌ Failed to fetch user
// Cleanup done

// ⚙️ 4️⃣ Sequential vs Parallel Execution
// ❌ Sequential (slow)

// Each await waits for the previous one:
async function getAll() {
  const user = await getUser();
  const posts = await getPosts();
  console.log(user, posts);
}

// ✅ Parallel (faster)

// Use Promise.all():
async function getAll() {
  const [user, posts] = await Promise.all([getUser(), getPosts()]);
  console.log(user, posts);
}
