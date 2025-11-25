// A closure is a function that remembers the variables from its lexical scope, even after the outer function has finished executing.

// 🔹 Example 1: Basic Closure
function outer() {
  let counter = 0; // variable in outer scope
  function inner() {
    counter++;
    console.log(counter);
  }
  return inner;
}

const fn = outer(); // outer() runs and returns inner
fn(); // 1
fn(); // 2
fn(); // 3

// ✅ The inner() function “remembers” the variable counter, even though outer() has already finished executing.

// That’s a closure.

// 🔹 How It Works Internally

// When outer() finishes, you might think counter should be gone.
// But fn still keeps a reference to the lexical environment of outer() → so counter stays alive in memory.

// 🔹 Example 2: Private Variables (Real Use Case)
function createAccount() {
  let balance = 1000; // private variable

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited: ${amount}, New Balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) console.log("Insufficient funds");
      else {
        balance -= amount;
        console.log(`Withdrew: ${amount}, Remaining: ${balance}`);
      }
    },
  };
}

const account = createAccount();
account.deposit(500); // Deposited: 500, New Balance: 1500
account.withdraw(200); // Withdrew: 200, Remaining: 1300
console.log(account.balance); // ❌ undefined (private!)

// ✅ balance is not directly accessible, but can be modified only via deposit() and withdraw().
// That’s data encapsulation using closures.

// 🔹 Example 3: Closure inside Loops
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000); // 4, 4, 4
}

// Why?
// Because all the callbacks share the same i (function-scoped due to var).

// ✅ Fix using let (block-scoped):
for (let i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000); // 1, 2,3
}
