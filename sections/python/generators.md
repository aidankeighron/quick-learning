---
title: "Generators"
description: "Lazy evaluation with yield and iterators."
order: 1
difficulty: "Intermediate"
---

## Question 1: Basic Generator
Create a generator function `simple_gen` that yields the number 1, then 2, then 3.

> Type: code
> Language: python
> Starting Code:
def simple_gen():
    # Your code here
    pass
> Verification Code:
vals = list(simple_gen())
assert vals == [1, 2, 3], f"Expected [1, 2, 3], but got {vals}"
print("Correct!")
> Expected Output: Correct!

## Question 2: Generator with Arguments
Write a generator function `count_to(n)` that yields numbers from 1 up to (and including) `n`.

> Type: code
> Language: python
> Starting Code:
def count_to(n):
    # Your code here
    pass
> Verification Code:
assert list(count_to(3)) == [1, 2, 3], "count_to(3) should yield [1, 2, 3]"
assert list(count_to(1)) == [1], "count_to(1) should yield [1]"
print("Correct!")
> Expected Output: Correct!

## Question 3: Using next()
Given the generator `g`, use the `next()` function to help retrieve the first value and assign it to the variable `first_val`.

> Type: code
> Language: python
> Starting Code:
def my_gen():
    yield "Start"
    yield "End"

g = my_gen()
# first_val = ...
> Verification Code:
try:
    if first_val == "Start":
        print("Correct!")
    else:
        # This will be caught as a test failure now
        raise AssertionError(f"Expected 'Start', got {first_val}")
except NameError:
    raise AssertionError("Variable 'first_val' not defined")
> Expected Output: Correct!

## Question 4: Generator Expressions
Create a generator expression named `squares` that yields the square of numbers from 0 to 4 (inclusive). Use parens `()` not brackets `[]`.

> Type: code
> Language: python
> Starting Code:
# squares = ...
> Verification Code:
import types
assert isinstance(squares, types.GeneratorType), "squares must be a generator (use parentheses)"
vals = list(squares)
assert vals == [0, 1, 4, 9, 16], f"Expected [0, 1, 4, 9, 16], but got {vals}"
print("Correct!")
> Expected Output: Correct!

## Question 5: Yield From
Write a generator `sub_gen` that uses `yield from` to yield all values from `range(3)`.

> Type: code
> Language: python
> Starting Code:
def sub_gen():
    # Use yield from
    pass
> Verification Code:
vals = list(sub_gen())
assert vals == [0, 1, 2], f"Expected [0, 1, 2], got {vals}"
print("Correct!")
> Expected Output: Correct!

## Question 6: Fibonacci Generator
Write a generator `fibonacci(limit)` that yields Fibonacci numbers (0, 1, 1, 2, 3...) as long as they are less than `limit`.

> Type: code
> Language: python
> Starting Code:
def fibonacci(limit):
    a, b = 0, 1
    # Your code here
    pass
> Verification Code:
vals = list(fibonacci(10))
expected = [0, 1, 1, 2, 3, 5, 8]
assert vals == expected, f"For limit 10, expected {expected}, got {vals}"
print("Correct!")
> Expected Output: Correct! 
