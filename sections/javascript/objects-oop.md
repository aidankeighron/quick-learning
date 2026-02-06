---
title: "Objects & OOP"
description: "Object literals, Classes, and inheritance."
order: 3
difficulty: "Intermediate"
---

## Question 1: Object Literal
Which syntax creates an empty object?

> Type: multiple-choice
- [ ] `[]`
- [ ] `()`
- [x] `{}`
- [ ] `Object()`

## Question 2: Accessing Properties
If you have an object `user = { name: "Alice" }`, how can you access `name`?

> Type: multiple-choice
- [x] `user.name`
- [ ] `user->name`
- [ ] `user::name`
- [ ] `user.get("name")`

## Question 3: Creating an Object
Create an object named `car` with properties `brand` set to "Toyota" and `year` set to 2020.

> Type: code
> Language: javascript
> Starting Code:
// const car = ...
> Verification Code:
if (typeof car !== 'object') throw new Error("car is not an object");
if (car.brand !== "Toyota") throw new Error("Expected brand to be Toyota");
if (car.year !== 2020) throw new Error("Expected year to be 2020");
console.log("Correct!");
> Expected Output: Correct!

## Question 4: Object Methods
Add a method `honk` to the `car` object (from code, redefine it) that returns "Beep!".

> Type: code
> Language: javascript
> Starting Code:
const car = {
    brand: "Ford",
    // Add honk method
};
> Verification Code:
if (typeof car.honk !== 'function') throw new Error("honk is not a function");
if (car.honk() !== "Beep!") throw new Error("Expected honk() to return 'Beep!'");
console.log("Correct!");
> Expected Output: Correct!

## Question 5: JSON
What method converts a JavaScript object into a JSON string?

> Type: multiple-choice
- [ ] `JSON.parse()`
- [ ] `JSON.toSTRING()`
- [x] `JSON.stringify()`
- [ ] `Object.toString()`

## Question 6: The 'this' Keyword
In a method inside an object, what does `this` refers to?

> Type: multiple-choice
- [ ] The global object
- [ ] The function itself
- [x] The object the method is called on
- [ ] undefined

## Question 7: Classes
Define a class `Person` with a constructor that takes `name` and sets `this.name`.

> Type: code
> Language: javascript
> Starting Code:
class Person {
    // Constructor
}
> Verification Code:
const p = new Person("Dave");
if (p.name !== "Dave") throw new Error("Constructor did not set name correctly");
console.log("Correct!");
> Expected Output: Correct!

## Question 8: Class Methods
Add a method `sayHello()` to `Person` (redefine class) that returns "Hello, I am [name]".

> Type: code
> Language: javascript
> Starting Code:
class Person {
    constructor(name) { this.name = name; }
    // Add sayHello
}
> Verification Code:
const p = new Person("Eve");
if (p.sayHello() !== "Hello, I am Eve") throw new Error("Incorrect greeting");
console.log("Correct!");
> Expected Output: Correct!

## Question 9: Inheritance
Create a class `Student` that extends `Person` and adds an `grade` property in the constructor.

> Type: code
> Language: javascript
> Starting Code:
class Person { constructor(name) { this.name = name; } }

class Student extends Person {
    constructor(name, grade) {
        // Call super
        // Set grade
    }
}
> Verification Code:
const s = new Student("Frank", "A");
if (s.name !== "Frank") throw new Error("Resulting object missing properties from Parent");
if (s.grade !== "A") throw new Error("Resulting object missing new property");
console.log("Correct!");
> Expected Output: Correct!

## Question 10: Static Methods
Add a static method `species()` to `Person` that returns "Homo Sapiens".

> Type: code
> Language: javascript
> Starting Code:
class Person {
    // static method
}
> Verification Code:
if (Person.species() !== "Homo Sapiens") throw new Error("Expected Person.species() to return 'Homo Sapiens'");
try {
 const p = new Person(); p.species(); 
 throw new Error("Should be static, not instance method");
} catch(e) { /* success if error */ }
console.log("Correct!");
> Expected Output: Correct!
