---
title: "Arrays & Methods"
description: "Process lists of data with map, filter, and reduce."
order: 2
difficulty: "Intermediate"
---

## Question 1: Accessing Elements
How do you access the first element of an array named `arr`?

> Link: https://www.w3schools.com/js/js_arrays.asp
> Type: multiple-choice
- [ ] `arr.first()`
- [ ] `arr[1]`
- [x] `arr[0]`
- [ ] `arr.get(0)`

## Question 2: Array Length
Which property gives the number of elements in an array?

> Link: https://www.w3schools.com/js/js_arrays.asp
> Type: multiple-choice
- [ ] size
- [x] length
- [ ] count
- [ ] len

## Question 3: Array Creation
Create an array named `colors` containing the strings "red", "green", and "blue".

> Link: https://www.w3schools.com/js/js_arrays.asp
> Type: code
> Language: javascript
> Starting Code:
// Create colors array
> Verification Code:
if (!Array.isArray(colors)) throw new Error("colors is not an array");
if (colors.length !== 3) throw new Error("Expected 3 elements");
if (colors[0] !== "red" || colors[1] !== "green" || colors[2] !== "blue") throw new Error(`Expected ["red", "green", "blue"], got [${colors}]`);
console.log("Correct!");
> Expected Output: Correct!

## Question 4: Adding Elements
Add "yellow" to the end of the `colors` array.

> Link: https://www.w3schools.com/js/js_array_methods.asp
> Type: code
> Language: javascript
> Starting Code:
const colors = ["red", "green", "blue"];
// Add "yellow"
> Verification Code:
if (colors.length !== 4) throw new Error("Expected 4 elements");
if (colors[3] !== "yellow") throw new Error(`Expected last element to be 'yellow', got '${colors[3]}'`);
console.log("Correct!");
> Expected Output: Correct!

## Question 5: Map Method
What does the `map()` method do?

> Link: https://www.w3schools.com/js/js_array_iteration.asp
> Type: multiple-choice
- [ ] Filters the array
- [x] Creates a new array by applying a function to every element
- [ ] Modifies the array in place
- [ ] Reduces the array to a single value

## Question 6: Filter Method
What does `filter()` return if no elements match the condition?

> Link: https://www.w3schools.com/js/js_array_iteration.asp
> Type: multiple-choice
- [ ] null
- [ ] undefined
- [ ] false
- [x] An empty array

## Question 7: Map Usage
Use `.map()` to create a new array `doubled` where each number in `nums` is multiplied by 2.

> Link: https://www.w3schools.com/js/js_array_iteration.asp
> Type: code
> Language: javascript
> Starting Code:
const nums = [1, 2, 3];
const doubled = ...
> Verification Code:
if (!doubled) throw new Error("doubled is not defined");
if (doubled[0] !== 2 || doubled[1] !== 4 || doubled[2] !== 6) throw new Error(`Expected [2, 4, 6], got [${doubled}]`);
console.log("Correct!");
> Expected Output: Correct!

## Question 8: Filter Usage
Use `.filter()` to create an array `evens` containing only the even numbers from `nums`.

> Link: https://www.w3schools.com/js/js_array_iteration.asp
> Type: code
> Language: javascript
> Starting Code:
const nums = [1, 2, 3, 4, 5, 6];
const evens = ...
> Verification Code:
if (!evens) throw new Error("evens is not defined");
if (evens.length !== 3) throw new Error("Expected 3 even numbers");
if (evens[0] !== 2 || evens[1] !== 4 || evens[2] !== 6) throw new Error(`Expected [2, 4, 6], got [${evens}]`);
console.log("Correct!");
> Expected Output: Correct!

## Question 9: Find Method
Use `.find()` to retrieve the first number greater than 10 from `nums` and assign it to `found`.

> Link: https://www.w3schools.com/js/js_array_iteration.asp
> Type: code
> Language: javascript
> Starting Code:
const nums = [5, 8, 12, 19, 3];
const found = ...
> Verification Code:
if (found !== 12) throw new Error(`Expected 12, got ${found}`);
console.log("Correct!");
> Expected Output: Correct!

## Question 10: Reduce Usage
Use `.reduce()` to calculate the sum of all numbers in `nums` and assign it to `sum`.

> Link: https://www.w3schools.com/js/js_array_iteration.asp
> Type: code
> Language: javascript
> Starting Code:
const nums = [10, 20, 30];
// const sum = ...
> Verification Code:
if (sum !== 60) throw new Error(`Expected 60, got ${sum}`);
console.log("Correct!");
> Expected Output: Correct!
