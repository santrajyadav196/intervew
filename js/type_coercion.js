//1. Strict equality (===)
//Compares value + type.
//No type conversion.

//1 === "1" // false
//1 === 1   // true

//2. Loose equality (==)
//If types differ, JavaScript tries to coerce one side. The key rules:

//(a) Boolean → Number
//true → 1
//false → 0
//true == 1  // true
//false == 0 // true

//(b) String ↔ Number
//String gets converted to a number (if possible).

//"42" == 42   // true
//"0" == 0     // true
//"hello" == 0 // false (NaN == 0 is false)

//(c) null and undefined
//Special case: null == undefined → true
//But with anything else → false
//null == undefined // true
//null == 0         // false
//undefined == 0    // false

//(d) Object/Array → Primitive

//Objects/arrays are converted via toPrimitive:
//First valueOf(), then toString().
//[] == ""   // true  ( [] → "" )
//[] == 0    // true  ( [] → "" → 0 )
//[1] == 1   // true  ( [1] → "1" → 1 )

//Quick Conversion Reference
//false → 0
//true → 1
//"" → 0
//"123" → 123
//[] → "" → 0
//{} → "[object Object]" (NaN if compared with number)

//Examples:
console.log([1] == true); //[1]=>1 and true=>1 so outout would be true
console.log([0] == false); // 0==0 true
console.log([] == ![]); //true,
//Evaluate ![]

//[] is an object, and all objects are truthy.
//So ![] → false.
//Now the expression is:[] == false => ""== 0 => 0==0 => true

console.log([null] == 0); // true
console.log([undefined] == 0); // true

//1. [null] == 0
//[null] → toString() → " " (empty string, not "null").
//(Because array with a single null → "")
//So comparison is "" == 0.
//"" → number 0.
//So 0 == 0 ✅ true

//2. [undefined] == 0

//[undefined] → toString() → "" (empty string, not "undefined").
//(Array with undefined behaves like empty slot → "")
//So comparison is "" == 0.
//"" → number 0.
//So 0 == 0 ✅ true

console.log([1, 2] == "1,2"); // true

//[1,2] is an array.
//When compared with a string/number, JS calls toString().
//[1,2].toString() → "1,2"
//So the comparison is:
// "1,2" == "1,2"// true

console.log([] == []); // false
console.log([1] == [1]); // false

//Rule Reminder:
//For objects/arrays, equality (== or ===) compares references, not contents.
//Two different arrays (even with same values) are different references in memory.

console.log([] == ![]); // ""==false=> 0==0=> true
console.log([[]] == 0); //""==0=> 0==0=> true

console.log([] + []);
//[] + []
//[] → "" (toString on empty array).
//So: "" + "" → "" (empty string).
//✅ Output: ""

console.log([] + {});
//[] → ""
//{} → "[object Object]" (default toString).
//So: "" + "[object Object]" → "[object Object]"
// ✅ Output: "[object Object]"

console.log({} + []);

//This one is tricky because {} at the start of a line is treated as a block, not an object literal!
//So the engine sees:
//{}   // empty block
//+ [] // unary plus applied to []
//+[] → converts [] to number.
//[] → "" → 0.
//So result: 0.

console.log(null === undefined);
//null === undefined
//Different types (null vs undefined).
//false
console.log(NaN === NaN);
//NaN === NaN
// Special case: NaN is never equal to anything, even itself.
// ✅ false (not true)

//console.log([] === []);
//Two different array objects in memory.
//  false

//console.log([1, 2, 3] === [1, 2, 3]);
//Two different array objects in memory.
//  false

//console.log({} === {});
//Two different object references.
// false

console.log(0 === -0);

//In JavaScript, 0 and -0 are considered equal with ===.
// ✅ true

console.log(Object.is(0, -0));

//Object.is(0, -0)
//Object.is is like === but with two key differences:
//It distinguishes +0 and -0.
//It treats NaN as equal to NaN.
//So here, Object.is(0, -0) → false.
// false

console.log(0 == false); // true
console.log(0 === false); // false
console.log("" == false); // true
console.log("" === false); // false

console.log("5" - 2); //3
console.log("5" + 2); // "52"
//Here + prefers string concatenation if any operand is a string → "5" + "2" = "52".
console.log(true + true); //2
console.log(false + 10); //10
console.log([1] + [1]); //"11"
//Arrays get converted to strings when used with +.
//[1].toString() → "1", [1].toString() → "1".
//So "1" + "1" = "11".
console.log([10] - [5]); //5//
// With -, both sides are coerced to numbers.
// [10].toString() → "10" → 10.
// [5].toString() → "5" → 5.
// So 10 - 5 = 5.

console.log([] == []);
// ❌ false
// Because arrays are objects → compared by reference, not value.
// Two different [] are stored at different memory locations.

console.log([] == ![]);
// ✅ true
// Step 1: ![] → false (since [] is truthy).
// Step 2: [] == false → [] → "" → 0, false → 0 → 0 == 0 → true.

console.log(null == undefined);
// ✅ true
// Special case: `null == undefined` is the only loose equality where both are equal.

console.log(null === undefined);
// ❌ false
// Strict equality checks type → different types.


console.log([] == 0);
// ✅ true
// Step 1: [] is an array → converted to primitive → "" (empty string).
// Step 2: "" is coerced to number → 0.
// Step 3: 0 == 0 → true.

console.log([0] == 0);
// ✅ true
// Step 1: [0] → "0" (array with single element is converted to string).
// Step 2: "0" → 0 (string to number conversion).
// Step 3: 0 == 0 → true.

console.log([1, 2] == "1,2");
// ✅ true
// Step 1: [1,2] → "1,2" (array toString).
// Step 2: "1,2" == "1,2" → same string → true.

console.log("0" == false);
// ✅ true
// Step 1: false → 0 (boolean to number).
// Step 2: "0" → 0 (string to number).
// Step 3: 0 == 0 → true.

console.log("0" === false);
// ❌ false
// Step 1: Strict equality → no coercion.
// Step 2: "0" is string, false is boolean → different types → false.

console.log([null] == 0);
// ✅ true
// Step 1: [null] → "" (array with single null → empty string).
// Step 2: "" → 0 (numeric coercion).
// Step 3: 0 == 0 → true.

console.log([undefined] == 0);
// ✅ true
// Step 1: [undefined] → "" (array with single undefined → empty string).
// Step 2: "" → 0 (numeric coercion).
// Step 3: 0 == 0 → true.

console.log(undefined + 1); //NaN + 1 => NaN
console.log(null + 1); //Number(null) → 0 => 0+1=1

//If either operand is a string, + performs string concatenation:

"Hello" + " " + "World"; // "Hello World"
"5" + 3; // "53"   (number 3 is converted to string)
true + " is boolean"; // "true is boolean"
null + "test"; // "nulltest"
undefined + "test"; // "undefinedtest"

//Rule:If at least one operand is a string, everything else is converted to a string.

//If both operands are numbers, + performs arithmetic addition:
2 + 3; // 5
null + 1; // 1  (null is converted to 0)
undefined + 1; // NaN (undefined cannot be converted to a number)
true + 2; // 3  (true is converted to 1)
false + 2; // 2  (false is converted to 0)

//Mixed types are converted depending on context:
//For +, string wins → everything else converted to string.
//For -, *, /, % → everything converted to number (no concatenation).

"5" - 2; // 3   (string "5" converted to number)
"5" * 2; // 10
"5" / "2"; // 2.5
"5" + 2; // "52"  (concatenation)

//1️⃣ + operator (concatenation vs addition)
//The + operator is special because it can do both string concatenation and numeric addition.
//Rule: If either operand is a string, the other is converted to string → concatenation happens. Otherwise, numeric addition happens.

"5" + 2; // "52"  → number 2 is converted to string "2"
2 + "5"; // "25"  → number 2 converted to string "2"
true + " apples"; // "true apples" → boolean true becomes string "true"
null + "test"; // "nulltest" → null becomes string "null"

//If both are non-strings, it does numeric addition:
1 + 2; // 3
true + 1; // 2 → true converts to 1
false + 5; // 5 → false converts to 0
null + 7; // 7 → null converts to 0
undefined + 1; // NaN → undefined cannot convert to number

//2️⃣ Other arithmetic operators (-, *, /, %)
//These never do string concatenation.
//They always convert operands to numbers using ToNumber conversion.

"5" - 2; // 3   → string "5" converts to number 5
"5" * 2; // 10  → string "5" converts to number 5
"10" / "2"; // 5   → both strings convert to numbers
"5" % 2; // 1   → string "5" converts to number 5
true * 3; // 3   → true converts to 1
false + 2; // 2   → false converts to 0
null - 1; // -1  → null converts to 0
undefined - 1; // NaN → undefined cannot convert

//3️⃣ Why this happens (Internal steps)
//JavaScript uses “abstract operations” for type coercion:

//For +:
//If either operand is string → ToPrimitive → ToString
//Else → ToNumber and addition
//For -, *, /, %:
//Both operands → ToNumber
//This is why "5" + 2 → "52", but "5" - 2 → 3.

//4️⃣ Mixed examples to memorize
"5" + 1; // "51"  (string wins)
1 + "5"; // "15"  (string wins)
"5" - 1; // 4     (numeric conversion)
true + 1; // 2     (true → 1)
false + "hi"; // "falsehi" (string wins)
null + 2; // 2     (null → 0)
undefined + 2; // NaN   (undefined → NaN)
