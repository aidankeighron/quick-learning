---
title: "Async JavaScript"
description: "Promises, Async/Await, and handling API calls."
order: 4
difficulty: "Advanced"
---

## Question 1: Blocking Code
What does it mean for code to be "non-blocking"?

> Type: multiple-choice
- [ ] It runs faster
- [ ] It stops the program if an error occurs
- [x] It allows other code to run while waiting for a long-running task
- [ ] It uses multiple threads

## Question 2: Promise States
Which is NOT a valid state of a Promise?

> Type: multiple-choice
- [ ] Pending
- [ ] Fulfilled
- [ ] Rejected
- [x] Paused

## Question 3: Creating a Promise
Create a Promise named `p` that resolves immediately with the string "Success".

> Type: code
> Language: javascript
> Starting Code:
const p = new Promise((resolve, reject) => {
    // resolve...
});
> Verification Code:
p.then(val => {
    if (val !== "Success") throw new Error(`Expected 'Success', got '${val}'`);
    console.log("Correct!");
}).catch(e => {
    throw new Error("Promise rejected");
});
> Expected Output: Correct!

## Question 4: Handling Promises
Use `.then()` to handle the result of promise `p` and log it.

> Type: code
> Language: javascript
> Starting Code:
const p = Promise.resolve("Data");
// p.then(...)
> Verification Code:
p.then(d => console.log(d));

// Wait a tick for the log to happen
setTimeout(() => {
    // Check dynamic output
    if (!console.output.includes("Data")) {
        throw new Error(`Expected output to contain 'Data', but got: "${console.output.trim()}"`);
    }
    console.log("Correct!"); 
}, 10);
> Expected Output: Data

## Question 5: Async Keyword
What does the `async` keyword ensure a function returns?

> Type: multiple-choice
- [ ] void
- [x] A Promise
- [ ] An object
- [ ] A callback

## Question 6: Await Keyword
Where can the `await` keyword be used?

> Type: multiple-choice
- [ ] Anywhere
- [ ] Only in callbacks
- [x] Only inside async functions (or top-level modules)
- [ ] Only in loops

## Question 7: Basic Async Function
Write an `async` function `getData` that returns "Loaded".

> Type: code
> Language: javascript
> Starting Code:
// async function...
> Verification Code:
if (getData().constructor.name !== "Promise") throw new Error("Must return a Promise (use async)");
getData().then(val => {
    if (val !== "Loaded") throw new Error(`Expected 'Loaded', got '${val}'`);
    console.log("Correct!");
});
> Expected Output: Correct!

## Question 8: Using Await
Inside the async function `run`, wait for `process()` and assign result to `res`.

> Type: code
> Language: javascript
> Starting Code:
function process() { return Promise.resolve("Done"); }

async function run() {
    // const res = await ...
    return res;
}
> Verification Code:
run().then(val => {
    if (val !== "Done") throw new Error(`Expected 'Done', got '${val}'`);
    console.log("Correct!");
});
> Expected Output: Correct!

## Question 9: Try/Catch Handling
Wrap the await call in a try/catch block to handle errors.

> Type: code
> Language: javascript
> Starting Code:
async function safeRun() {
    // try { await fail() } catch (e) { return "Caught" }
}
function fail() { return Promise.reject("Error"); }
> Verification Code:
safeRun().then(val => {
    if (val !== "Caught") throw new Error(`Expected to catch error and return 'Caught', got '${val}'`);
    console.log("Correct!");
});
> Expected Output: Correct!

## Question 10: Parallel Execution
Use `Promise.all` to run `p1` and `p2` simultaneously and return the results array.

> Type: code
> Language: javascript
> Starting Code:
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

async function getAll() {
    // return Promise.all...
}
> Verification Code:
getAll().then(vals => {
    if (!Array.isArray(vals)) throw new Error("Expected array");
    if (vals[0] !== 1 || vals[1] !== 2) throw new Error(`Expected [1, 2], got [${vals}]`);
    console.log("Correct!");
});
> Expected Output: Correct!
