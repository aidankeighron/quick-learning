---
title: "Generators"
description: "Lazy evaluation with yield and iterators."
order: 1
difficulty: "Intermediate"
---

## Question 1: What is a Generator?
What is the primary benefit of using a generator over a standard list in Python?

> Type: multiple-choice
- [ ] It sorts data automatically
- [ ] It allows random access to elements
- [x] It produces items one at a time and is memory efficient
- [ ] It creates a copy of the entire dataset

## Question 2: The Yield Keyword
Which keyword is used to return a value from a generator function without terminating it?

> Type: multiple-choice
- [ ] return
- [x] yield
- [ ] break
- [ ] continue

## Question 3: Basic Generator
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

## Question 4: Generator with Arguments
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

## Question 5: Memory Usage
If you need to process a clear large file line by line, which approach uses the least memory?

> Type: multiple-choice
- [ ] Reading the entire file into a list
- [x] Using a generator to yield each line
- [ ] Using a recursive function
- [ ] Storing lines in a dictionary

## Question 6: StopIteration Exception
What exception is raised when a `next()` call is made on a generator that has no more items to yield?

> Type: multiple-choice
- [ ] IndexError
- [ ] ValueError
- [x] StopIteration
- [ ] GeneratorExit

## Question 7: Using next()
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

## Question 8: Generator Expressions
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

## Question 9: Yield From
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

## Question 10: Fibonacci Generator
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
