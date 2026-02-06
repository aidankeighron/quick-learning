---
title: "Object-Oriented Programming"
description: "Classes, Inheritance, and Polymorphism."
order: 4
difficulty: "Advanced"
---

## Question 1: Class Definition
Define a class named `Car` with an empty body (use `pass`).

> Type: code
> Language: python
> Starting Code:
# Define class Car
pass
> Verification Code:
assert 'Car' in locals(), "Class 'Car' is not defined"
assert isinstance(Car, type), "'Car' must be a class"
print("Correct!")
> Expected Output: Correct!

## Question 2: The Self Parameter
Define a method `honk(self)` inside `Car` that returns the string "Beep!".

> Type: code
> Language: python
> Starting Code:
class Car:
    def honk(self):
        # Your code here
        pass
> Verification Code:
c = Car()
assert hasattr(c, 'honk'), "Method 'honk' missing in Car"
assert c.honk() == "Beep!", f"Expected 'Beep!', got '{c.honk()}'"
print("Correct!")
> Expected Output: Correct!

## Question 3: Inheritance
Define a class `ElectricCar` that inherits from `Car`.

> Type: code
> Language: python
> Starting Code:
class Car:
    pass

# Define ElectricCar inheriting from Car
pass
> Verification Code:
assert 'ElectricCar' in locals(), "Class 'ElectricCar' not defined"
assert issubclass(ElectricCar, Car), "ElectricCar should inherit from Car"
print("Correct!")
> Expected Output: Correct!

## Question 4: Super Function
Inside `Child.__init__`, use `super()` to call the parent's `__init__` method.

> Type: code
> Language: python
> Starting Code:
class Parent:
    def __init__(self):
        self.parent_init = True

class Child(Parent):
    def __init__(self):
        # Call parent init using super()
        pass
> Verification Code:
c = Child()
assert hasattr(c, 'parent_init') and c.parent_init is True, "Parent init was not called (attribute 'parent_init' missing)"
print("Correct!")
> Expected Output: Correct!

## Question 5: Private Variables
Define a class `Secret` with an attribute `_key` set to "hidden" inside `__init__`. Use the single underscore convention.

> Type: code
> Language: python
> Starting Code:
class Secret:
    def __init__(self):
        # Set _key
        pass
> Verification Code:
s = Secret()
assert hasattr(s, '_key'), "Attribute '_key' missing"
assert s._key == "hidden", f"Expected '_key' to be 'hidden', got '{s._key}'"
print("Correct!")
> Expected Output: Correct!

## Question 6: Class Method Implementation
Write a class named `Greeter` with a method `greet(name)` that returns "Hello, [name]!".

> Type: code
> Language: python
> Starting Code:
class Greeter:
    def greet(self, name):
        pass
> Verification Code:
g = Greeter()
res = g.greet("Python")
assert res == "Hello, Python!", f"Expected 'Hello, Python!', got '{res}'"
print("Correct!")
> Expected Output: Correct!
