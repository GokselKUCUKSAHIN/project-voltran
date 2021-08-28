const sizeof = require("object-sizeof");

// 2B per character, 6 chars total => 12B
console.log(sizeof({abc: 'def'}))

// 8B for Number => 8B
console.log(sizeof(12345))

console.log("boolean", 8 * sizeof(true));
console.log("number", 8 * sizeof(101));
console.log("bigInt", 8 * sizeof(42n));