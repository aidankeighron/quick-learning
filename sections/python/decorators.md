---
title: "Decorators"
description: "Modify function behavior with higher-order functions."
order: 2
difficulty: "Intermediate"
---

## Question 1: What is a Decorator?
In Python, what is a decorator?

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: multiple-choice
- [ ] A function that returns a boolean value
- [x] A design pattern that allows a user to add new functionality to an existing object without modifying its structure
- [ ] A class that inherits from another class
- [ ] A method to decorate strings for printing

## Question 2: Decorator Syntax
Which symbol is used to apply a decorator to a function in Python?

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: multiple-choice
- [ ] #
- [ ] &
- [x] @
- [ ] $

## Question 3: Decorator Syntax
Use the correct syntax to apply the `my_decorator` to the `hello` function.

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: code
> Language: python
> Starting Code:
def my_decorator(func):
    def wrapper():
        return func()
    return wrapper

# Apply the decorator
def hello():
    pass
> Verification Code:
assert hello.__name__ == "wrapper" or hello.__qualname__.endswith("wrapper"), "Function was not decorated"
print("Correct!")
> Expected Output: Correct!

## Question 4: Creating a Decorator
Write a decorator `simple_dec` that takes a function, and returns a `wrapper` function (which just calls the original function).

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: code
> Language: python
> Starting Code:
def simple_dec(func):
    # Define wrapper
    # Return wrapper
    pass
> Verification Code:
@simple_dec
def test(): return "ok"
val = test()
assert val == "ok", f"Expected 'ok', got '{val}'"
print("Correct!")
> Expected Output: Correct!

## Question 5: Execution Order
When using multiple decorators on a single function, in what order are they applied?

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: multiple-choice
- [ ] Top to bottom
- [x] Bottom to top (Inner to Outer)
- [ ] Random order
- [ ] Alphabetical order

## Question 6: Decorating with Arguments
If you are decorating a function that accepts arguments, what must your wrapper function do?

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: multiple-choice
- [ ] It cannot accept arguments
- [x] It should accept *args and **kwargs (or specific args) and pass them to the original function
- [ ] It must delete the arguments
- [ ] It must return None

## Question 7: Preserving Metadata
Use `@functools.wraps` inside `my_dec` so that the decorated function retains its original name `test_func`.

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: code
> Language: python
> Starting Code:
import functools

def my_dec(func):
    @functools.wraps(func)
    def wrapper():
        return func()
    return wrapper

# No changes needed below, just run to verify
@my_dec
def test_func():
    """Docstring."""
    pass
> Verification Code:
assert test_func.__name__ == "test_func", f"Expected function name 'test_func', got '{test_func.__name__}'"
print("Correct!")
> Expected Output: Correct!

## Question 8: Chaining Decorators
Apply both `dec1` and `dec2` to `greet`. `dec1` should run *outside* (first applied, last executed) and `dec2` *inside*.

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: code
> Language: python
> Starting Code:
def dec1(f): return lambda: "1" + f()
def dec2(f): return lambda: "2" + f()

# Apply decorators
def greet():
    return "Hello"
> Verification Code:
# If dec1 is top/outer: dec1(dec2(greet)) -> "1" + "2" + "Hello"
val = greet()
assert val == "12Hello", f"Expected '12Hello', got '{val}'"
print("Correct!")
> Expected Output: Correct!

## Question 9: Handling Arguments
Update the wrapper to accept any positional arguments (`*args`) and pass them to `func`.

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: code
> Language: python
> Starting Code:
def pass_args(func):
    def wrapper(): # Update arguments
        return func() # Update arguments
    return wrapper
> Verification Code:
@pass_args
def add(a, b): return a + b
try:
    res = add(2, 3)
    assert res == 5, f"Expected 5, got {res}"
    print("Correct!")
except TypeError as e:
    raise AssertionError(f"TypeError caught: {e}. Did you pass *args?")
> Expected Output: Correct!

## Question 10: Simple Logger
Write a decorator `log_execution` that prints "Executing" before running the function.

> Link: https://www.w3schools.com/python/python_decorators.asp
> Type: code
> Language: python
> Starting Code:
def log_execution(func):
    # Define wrapper
    pass
> Verification Code:
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

@log_execution
def hello():
    print("Hello")

hello()

sys.stdout = old_stdout
output = mystdout.getvalue().strip()
lines = output.split('\n')
assert len(lines) >= 2, f"Expected at least 2 lines of output, got {len(lines)}"
assert "Executing" in lines[0], f"First line should contain 'Executing', got '{lines[0]}'"
assert "Hello" in lines[1], f"Second line should contain 'Hello', got '{lines[1]}'"
print("Correct!")
> Expected Output: Correct!
