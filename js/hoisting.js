// Hoisting is JavaScript’s default behavior of moving declarations (not initializations) to the top of the current scope before execution.

// That means you can use variables and functions before you declare them — but with some differences depending on whether you use var, let, const, or a function declaration.

console.log(a); // ❌ undefined
var a = 5;
console.log(a); // ✅ 5

//During compilation, JS treats it as:

var a; // declaration is hoisted to the top
console.log(a); // undefined (not 5 yet)
a = 5; // initialization stays in place
console.log(a); // 5

//Key points:
//var declarations are hoisted with default value undefined.
//You can reference them before initialization, but you get undefined.

//3. Hoisting with let and const

console.log(b); // ❌ ReferenceError
let b = 10;

console.log(c); // ❌ ReferenceError
const c = 20;

//let and const declarations are hoisted, but they are in the Temporal Dead Zone (TDZ) until the line where they are initialized.

//You cannot access them before initialization — otherwise you get a ReferenceError.

greet(); // ✅ "Hello"

function greet() {
  console.log("Hello");
}

//Explanation:
// Function declarations are fully hoisted — both the declaration and body.
//You can call the function before it appears in code.

sayHi(); // ❌ TypeError: sayHi is not a function
var sayHi = function () {
  console.log("Hi");
};

//Explanation:
//Only the variable declaration is hoisted (var sayHi;), not the function assignment.
//At the time of calling, sayHi is undefined.

hello(); // ❌ ReferenceError: Cannot access 'hello' before initialization
let hello = () => console.log("Hello");

//1.var
//Hoisted with undefined
//Can be accessed before initialization (value is undefined)

//2.let & const
//Hoisted but in TDZ
//Accessing before initialization → ReferenceError

//3.Function declarations
//Fully hoisted (can call before declaration)

//4.Function expressions / arrow functions
//Hoisted like variables (TDZ or undefined)
//Cannot call before initialization

console.log(x); // undefined
var x = 1;

console.log(y); // ReferenceError
let y = 2;

foo(); // "Hello"
function foo() {
  console.log("Hello");
}

bar(); // TypeError: bar is not a function
var bar = function () {
  console.log("Hi");
};

baz(); // ReferenceError
let baz = () => console.log("Arrow");

bar();
var bar = function () {
  console.log("Hi");
};
//var bar is hoisted, but only the declaration, not the assignment.
//At the time of the call:

var bar; // hoisted, value is undefined
bar(); // ❌ TypeError: undefined is not a function
bar = function () {
  console.log("Hi");
};
//So you cannot call it before initialization.

var x = 1;
function test() {
  console.log(x);
  var x = 2;
}
test();

//Inside the function, var x is hoisted to the top of the function scope:

function test() {
  var x; // hoisted declaration
  console.log(x); // undefined (local x exists but not initialized)
  x = 2; // initialization
}

// undefined

var x = 1;
function test() {
  console.log(x);
  if (false) {
    var x = 2;
  }
}
test();
// will be look like
function test() {
  var x; // hoisted
  console.log(x); // ?
  if (false) {
    x = 2; // this never executes
  }
}

// output will be undefined

function outer() {
  console.log(y);
  let y = 5;
}
outer();

// output will be ref error

console.log(typeof func);

var func = function () {};
// code wll be
var func; // hoisted
console.log(typeof func);
func = function () {}; // assignment stays here

// output will be undefined

console.log(typeof func);
func();
var func = function () {
  console.log("hello");
};

var func; // hoisted, initialized as undefined

console.log(typeof func); // typeof undefined → "undefined"

func(); // ❌ ERROR! trying to call undefined as a function

func = function () {
  console.log("hello");
};

// output will be undefined
//Uncaught TypeError: func is not a function

console.log(typeof func);
func();
let func = function () {
  console.log("hello");
};
//output ReferenceError: Cannot access 'func' before initialization

console.log(sum(2, 3)); // ?
console.log(mul(2, 3)); // ?

function sum(a, b) {
  return a + b;
}

var mul = function (a, b) {
  return a * b;
};

//Step 1 – Hoisting phase

//function sum(...) {...} → hoisted fully (definition + body).

//var mul → hoisted as mul = undefined (initialization happens later).

//Step 2 – Execution

//console.log(sum(2, 3)); → ✅ works → 5.

//console.log(mul(2, 3)); → at this point, mul is still undefined.
//Trying to call undefined(...) throws a TypeError, not undefined.

//output will be 5
//TypeError: mul is not a function

const obj = { a: 1 };
const obj2 = { b: 2 };

console.log(obj == obj2); // ❌ false
console.log(obj === obj2); // ❌ false

//Objects are reference types in JavaScript.
//obj and obj2 point to different memory locations, even though their contents are the same.

Object.freeze(obj);
obj.a = 2;
console.log(obj.a);

//Object.freeze(obj) makes the object immutable.
//You cannot modify, add, or delete properties after freezing.
//The value of a remains 1.

const copy = { ...obj };
copy.a = 2;
console.log(obj.a); // 1

const merged = Object.assign(obj, obj2);

console.log(merged);
console.log(obj);
console.log(merged === obj);

//Output:{ a: 1, b: 2 } { a: 1, b: 2 } true

const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const copy = { ...obj };
copy.b.c = 3;

console.log(obj.b.c); //3

const obj = { a: 1, a: 2, b: 3 };
console.log(obj); //{ a: 2, b: 3 }
//In object literals, if a property is defined multiple times, the last value wins.
//So a: 1 is overwritten by a: 2.

const obj = {};
obj[{}] = 1;
obj[{ a: 1 }] = 2;

console.log(obj); //{ '[object Object]': 2 }

const obj = Object.create({ a: 1 });
console.log(obj); //{}
obj.b = 2;

console.log(obj); //{b:2}

delete obj.a;
delete obj.b;

console.log(obj); //{}

console.log(obj.a, obj.b); // 1, undefined

const proto = { a: 1 };
const obj = Object.create(proto);

obj.a = 2;
console.log(obj.a); //2

delete obj.a;
console.log(obj.a); //1

const obj = { 100: "a", 2: "b", 7: "c", d: "d" };
console.log(Object.keys(obj)); //["2", "7", "100", "d"]
