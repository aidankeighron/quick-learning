---
title: "JavaScript Basics"
description: "Variables, data types, and functions."
order: 1
difficulty: "Beginner"
---

## Question 1: What is JavaScript?
What is the primary role of JavaScript in web development?

> Link: https://www.w3schools.com/js/js_intro.asp
> Type: multiple-choice
- [ ] To style web pages
- [x] To add interactivity and logic to web pages
- [ ] To define the structure of web pages
- [ ] To manage database schemas

## Question 2: Variable Declarations
Which keyword declares a variable that cannot be reassigned?

> Link: https://www.w3schools.com/js/js_variables.asp
> Type: multiple-choice
- [ ] var
- [ ] let
- [x] const
- [ ] static

## Question 3: Hello World
Write code to log the string "Hello World" to the console.

> Link: https://www.w3schools.com/js/js_output.asp
> Type: code
> Language: javascript
> Starting Code:
// Log "Hello World"
> Verification Code:
// Logic handled by console interception in CodeRunner
if (!output.includes("Hello World")) {
    throw new Error(`Expected output to contain 'Hello World', but got: "${output.trim()}"`);
}
console.log("Correct!");
> Expected Output: Hello World

## Question 4: Variables
Declare a variable named `score` using `let` and assign it the value `10`.

> Link: https://www.w3schools.com/js/js_variables.asp
> Type: code
> Language: javascript
> Starting Code:
// Declare score
> Verification Code:
if (typeof score === 'undefined') {
    throw new Error("Variable 'score' is not defined");
}
if (score !== 10) {
    throw new Error(`Expected score to be 10, got ${score}`);
}
console.log("Correct!");
> Expected Output: Correct!

## Question 5: Data Types
What is the result of `typeof "Hello"` in JavaScript?

> Link: https://www.w3schools.com/js/js_datatypes.asp
> Type: multiple-choice
- [x] "string"
- [ ] "text"
- [ ] "String"
- [ ] "char"

## Question 6: Equality Operators
Which operator checks for both value and type equality (strict equality)?

> Link: https://www.w3schools.com/js/js_comparisons.asp
> Type: multiple-choice
- [ ] ==
- [ ] =
- [x] ===
- [ ] !=

## Question 7: Basic Function
Write a function named `greet` that takes a name as an argument and returns "Hello, [name]!".

> Link: https://www.w3schools.com/js/js_functions.asp
> Type: code
> Language: javascript
> Starting Code:
function greet(name) {
    // Your code here
}
> Verification Code:
if (typeof greet !== 'function') throw new Error("greet is not a function");
if (greet("Alice") !== "Hello, Alice!") throw new Error("Expected 'Hello, Alice!', got " + greet("Alice"));
console.log("Correct!");
> Expected Output: Correct!

## Question 8: Arrow Functions
Convert the function below into an arrow function named `add` that returns the sum of `a` and `b`.

> Link: https://www.w3schools.com/js/js_arrow_function.asp
> Type: code
> Language: javascript
> Starting Code:
// const add = ...
> Verification Code:
if (typeof add !== 'function') throw new Error("add is not defined");
if (add(2, 3) !== 5) throw new Error(`Expected add(2, 3) to be 5, got ${add(2, 3)}`);
// Basic check for arrow syntax isn't easily possible without parsing code string, 
// but we verify functionality.
console.log("Correct!");
> Expected Output: Correct!

## Question 9: Template Literals
Use a template literal (backticks) to create a string `message` that says "You have [count] items", where `count` is 5.

> Link: https://www.w3schools.com/js/js_string_templates.asp
> Type: code
> Language: javascript
> Starting Code:
const count = 5;
let message;
> Verification Code:
if (message !== "You have 5 items") throw new Error(`Expected "You have 5 items", got "${message}"`);
console.log("Correct!");
> Expected Output: Correct!

## Question 10: Conditionals
Write a function `checkSign(n)` that returns "Positive" if n > 0, "Negative" if n < 0, and "Zero" otherwise.

> Link: https://www.w3schools.com/js/js_if_else.asp
> Type: code
> Language: javascript
> Starting Code:
function checkSign(n) {
    // Your code here
}
> Verification Code:
if (checkSign(10) !== "Positive") throw new Error(`Expected 'Positive' for 10, got '${checkSign(10)}'`);
if (checkSign(-5) !== "Negative") throw new Error(`Expected 'Negative' for -5, got '${checkSign(-5)}'`);
if (checkSign(0) !== "Zero") throw new Error(`Expected 'Zero' for 0, got '${checkSign(0)}'`);
console.log("Correct!");
> Expected Output: Correct!
