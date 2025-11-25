const memoize = (fn) => {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn(...args);
      return cache[key];
    }
    console.log("catched value return here");
    return cache[key];
  };
};

const add = (a, b) => {
  const sum = a + b;
  return sum;
};

const memoizeValue = memoize(add);

console.log(memoizeValue(2, 5));

var obj = {
  result: 0,

  addNumber: function (a) {
    this.result += a;
    return this; // return the object itself for chaining
  },

  multiplyNumber: function (a) {
    this.result *= a;
    return this;
  },
};

obj.addNumber(10).multiplyNumber(2);
console.log(obj.result); // 20

let arr = [1, 2, 3];

arr.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
};

arr.multiply = function (a) {
  return this.map((value) => a * value);
};

console.log(arr.sum()); // 6
console.log(arr.multiply(2)); //[ 2, 4, 6 ]

Array.prototype.sum = function () {
  return this.reduce((acc, val) => acc + val, 0);
};
Array.prototype.multiply = function (a) {
  return this.map((val) => val * a);
};

console.log([1, 2, 3].sum()); // 6
console.log([10, 20].multiply(2)); // [ 20, 40 ]

class MyArray extends Array {
  sum() {
    return this.reduce((acc, val) => acc + val, 0);
  }
  multiply(a) {
    return this.map((value) => value * a);
  }
}

let nums = new MyArray(1, 2, 3, 4);
console.log(nums.sum()); // 10
console.log(nums.multiply(2)); // [20, 40]

//✅ Summary:

//Add method to one array → simple but local.

//Extend Array.prototype → affects all arrays (be cautious).

//Create a subclass → safe, recommended for custom array-like behavior.

function createBankAccount() {
  let balance = 0;
  return {
    deposit(amount) {
      balance += amount;
      console.log(
        `Amount deposited is ${amount} and Now total balance is ${balance}`
      );
    },
    withdraw(amount) {
      if (balance >= amount) {
        balance -= amount;
        console.log(
          `Amount deducted is ${amount} and Now total balance is ${balance}`
        );
      } else {
        console.log("Insuffient balance");
      }
    },
    getBalance() {
      return balance;
    },
  };
}

const mybanks = createBankAccount();
mybanks.deposit(100);
mybanks.withdraw(20);
console.log(mybanks.getBalance());

class CreateBankAccount {
  constructor(initialBalance = 0) {
    this.balance = initialBalance; // start with 0 or given amount
  }

  deposit(amount) {
    this.balance += amount;
    console.log(
      `Amount deposited is ${amount} and Now total balance is ${this.balance}`
    );
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Amount deducted is ${amount} and Now total balance is ${this.balance}`
      );
    } else {
      console.log("Insufficient balance");
    }
  }

  getBalance() {
    return this.balance;
  }
}

// ✅ Usage
const mybank1 = new CreateBankAccount();
mybank1.deposit(100); // Amount deposited is 100 and Now total balance is 100
mybank1.withdraw(20); // Amount deducted is 20 and Now total balance is 80
console.log(mybank1.getBalance()); // 80

class CreateBankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    console.log(`Deposited: ${amount}, Balance: ${this.#balance}`);
  }

  withdraw(amount) {
    if (this.#balance >= amount) {
      this.#balance -= amount;
      console.log(`Withdrawn: ${amount}, Balance: ${this.#balance}`);
    } else {
      console.log("Insufficient balance");
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const mybank = new CreateBankAccount();
mybank.deposit(200);
mybank.withdraw(50);
console.log(mybank.getBalance()); // 150
// console.log(mybank.#balance); ❌ SyntaxError (private)

class TodoList {
  #tasks = []; // private field

  addTask(task) {
    this.#tasks.push({ task, isCompleted: false });
  }

  removeTask(task) {
    const index = this.#tasks.findIndex((item) => item.task === task);
    if (index !== -1) {
      this.#tasks.splice(index, 1);
    } else {
      console.log(`Task "${task}" not found`);
    }
  }

  markCompleted(task) {
    const taskObj = this.#tasks.find((item) => item.task === task);
    if (taskObj) {
      taskObj.isCompleted = true;
    } else {
      console.log(`Task "${task}" not found`);
    }
  }

  getTasks() {
    return [...this.#tasks];
  }
}

// ✅ Usage
const todo = new TodoList();
todo.addTask("Learn JS");
todo.addTask("Build project");
todo.markCompleted("Learn JS");
todo.removeTask("Build project");
console.log(todo.getTasks());
