// Event Delegation is a technique in which you attach a single event listener to a parent element, and it handles events that bubble up from its child elements.

// Instead of adding multiple listeners to every child,
// ➡️ you “delegate” the event handling to their parent.

// 🧩 Example — Without Delegation

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Button clicked:", button.innerText);
  });
});

// ❌ Problem:

// Adds multiple listeners — one for every .btn
// Consumes memory
// Not efficient when elements are added dynamically

// ✅ With Event Delegation
document.querySelector("#button-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    console.log("Button clicked:", e.target.innerText);
  }
});

// ✅ Now:

// Only one listener is attached (on the parent)
// Works for existing + dynamically added buttons
// More efficient and scalable

// 🔹 2️⃣ How It Works (Mechanism)

// This works because of event bubbling.

// 🧭 Event Bubbling:
// When an event (like click) happens on an element:
// 1. It first runs on the element itself
// 2. Then “bubbles up” to its parent
// 3.Continues up until the document object

// So you can “catch” child events by listening on the parent.

// 🧩 3️⃣ Example — Dynamic Elements
`<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<button id="add">Add Item</button>`;

const list = document.getElementById("list");
const add = document.getElementById("add");

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.innerText);
  }
});

add.addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.textContent = `Item ${list.children.length + 1}`;
  list.appendChild(newItem);
});

// ✅ You can click even newly added <li> elements without adding new listeners — thanks to event delegation.

// ⚡ 5️⃣ Key Benefits

// ✅ Performance — fewer listeners → less memory
// ✅ Handles dynamic elements
// ✅ Cleaner, scalable code
// ✅ Easier maintenance

// ✅ Summary Table

// Event Bubbling=>Event travels from child → parent
// Event Capturing=>Event travels from parent → child
// Event Delegation=>Handle child events via parent listener
// Benefit=>Better performance, dynamic support
