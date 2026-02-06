---
title: "Object-Oriented Programming"
description: "Classes, Inheritance, and Polymorphism."
---

## Question 1: Class Definition
Which keyword is used to define a class in Python?

- [ ] struct
- [x] class
- [ ] define
- [ ] object

> Hint: It's the same keyword used in C++ and Java.
> Explanation: Use the `class` keyword to define a new class.

## Question 2: The Self Parameter
What does the `self` parameter represent in a class method?

- [ ] A reference to the global scope
- [ ] A reference to the parent class
- [x] A reference to the current instance of the class
- [ ] A keyword for static methods

> Hint: It allows access to attributes and methods of the object.
> Explanation: `self` represents the instance of the class. By using `self`, we can access the attributes and methods of the class in python.

## Question 3: Inheritance Syntax
How do you define a class `Dog` that inherits from `Animal`?

- [ ] class Dog extends Animal:
- [ ] class Dog inherits Animal:
- [x] class Dog(Animal):
- [ ] class Dog : Animal

> Hint: Parentheses are used to specify the parent class.
> Explanation: Python uses `class Child(Parent):` syntax for inheritance.

## Question 4: Super Function
What is the purpose of the `super()` function?

- [ ] To create a superuser
- [ ] To call a method from a child class
- [x] To call a method from the parent class
- [ ] To initialize a static variable

> Hint: It's often used in `__init__` methods.
> Explanation: `super()` allows you to refer to the parent class.

## Question 5: Private Variables
How do you loosely define a "private" variable in Python?

- [ ] private var_name
- [ ] $var_name
- [x] _var_name (convention) or __var_name (name mangling)
- [ ] (var_name)

> Hint: Python doesn't have true private variables, but uses leading underscores.
> Explanation: A single underscore `_` is a convention for internal use. Double underscores `__` trigger name mangling.

## Question 6: Class Method Implementation
Write a class named `Greeter` with a method `greet` that returns "Hello, [name]!".

> Type: code
> Language: python
> Expected Output: Hello, Python!
