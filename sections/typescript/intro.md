---
title: "TypeScript Basics"
description: "Types, Interfaces, and Compilation."
order: 1
difficulty: "Beginner"
---

## Question 1: What is TypeScript?
What is the relationship between TypeScript and JavaScript?

> Link: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
> Type: multiple-choice
- [ ] TypeScript is a completely different language
- [x] TypeScript is a superset of JavaScript
- [ ] TypeScript is a replacement for HTML
- [ ] TypeScript runs directly in the browser without compilation

## Question 2: Type Annotation
Which syntax correctly defines a variable `name` as a string?

> Link: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
> Type: multiple-choice
- [ ] `var name = string`
- [ ] `string name = "Alice"`
- [x] `const name: string = "Alice"`
- [ ] `name :: string`

## Question 3: Type Checking
Declare a variable `age` of type `number` and assign it the value `25`.

> Link: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
> Type: code
> Language: typescript
> Starting Code:
// Declare age
> Verification Code:
// We verify via JS execution, but the transpiler ensures valid syntax first.
if (typeof age === "undefined") throw new Error("Variable 'age' is not defined");
if (typeof age !== "number") throw new Error(`Expected type 'number', got '${typeof age}'`);
if (age !== 25) throw new Error(`Expected value 25, got ${age}`);
console.log("Correct!");
> Expected Output: Correct!

## Question 4: Interfaces
Define an interface `User` with a property `id` (number) and use it to type a constant `user`.

> Link: https://www.typescriptlang.org/docs/handbook/2/objects.html
> Type: code
> Language: typescript
> Starting Code:
interface User {
    // Define properties
}
const user: User = {
    // Initialize
};
> Verification Code:
if (typeof user === "undefined") throw new Error("Variable 'user' is not defined");
if (typeof user.id !== "number") throw new Error(`Expected user.id to be a number, got ${typeof user.id}`);
console.log("Correct!");
> Expected Output: Correct!

## Question 5: Functions
Write a function `add(a: number, b: number): number` that returns the sum.

> Link: https://www.typescriptlang.org/docs/handbook/2/functions.html
> Type: code
> Language: typescript
> Starting Code:
function add(a: number, b: number): number {
    // code
}
> Verification Code:
if (typeof add !== "function") throw new Error("add is not a function");
if (add(2, 3) !== 5) throw new Error(`Expected 5, got ${add(2, 3)}`);
console.log("Correct!");
> Expected Output: Correct!
