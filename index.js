"use strict";
console.log(this);
function showThis() {
  console.log(this);
}

showThis(); // window (in browser) OR undefined (in strict mode)
