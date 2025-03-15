const assert = require("assert");
const { decodeBencode } = require("./main"); // Adjust the path to your main script

// Test cases
const testCases = [
  // Integers
  { input: "i123e", expected: 123 },
  { input: "i-42e", expected: -42 },

  // Strings
  { input: "4:spam", expected: "spam" },
  { input: "11:hello world", expected: "hello world" },

  // Lists
  { input: "l4:spam4:eggsi42ee", expected: ["spam", "eggs", 42] },
  { input: "l5:apple5:grape3:peae", expected: ["apple", "grape", "pea"] },

  // Dictionaries
  { input: "d3:foo3:bar5:helloi52ee", expected: {"foo":"bar","hello":52} },
  { input: "d4:spam4:eggse", expected: { spam: "eggs" } },
  { input: "d3:fooi42e4:spaml3:bar4:coloee", expected: { foo: 42, spam: ["bar", "colo"] } },
  { input: "d5:apple5:fruit5:color3:rede", expected: { apple: "fruit", color: "red" } },

  // Nested Structures
  { input: "l3:catd4:colo3:red3:agei5eee", expected: ["cat", { colo: "red", age: 5 }] },
  { input: "l3:catd4:colo3:red3:agei5e5:colori5ee", expected: ["cat", {"colo": "red", "age": 5}, "color", 5] },
];

// Run tests
testCases.forEach(({ input, expected }, index) => {
  const result = decodeBencode(input);
  assert.deepStrictEqual(result, expected, `Test case ${index + 1} failed`);
  console.log(`✅ Test case ${index + 1} passed`);
});

console.log("🎉 All test cases passed!");
