---
title: "Decorators"
description: "Modify function behavior with higher-order functions."
order: 2
difficulty: "Intermediate"
---

## Question 1: Decorator Syntax
Use the correct syntax to apply the `my_decorator` to the `hello` function.

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

## Question 2: Creating a Decorator
Write a decorator `simple_dec` that takes a function, and returns a `wrapper` function (which just calls the original function).

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
assert test() == "ok"
print("Correct!")
> Expected Output: Correct!

## Question 3: Preserving Metadata
Use `@functools.wraps` inside `my_dec` so that the decorated function retains its original name `test_func`.

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
assert test_func.__name__ == "test_func"
print("Correct!")
> Expected Output: Correct!

## Question 4: Chaining Decorators
Apply both `dec1` and `dec2` to `greet`. `dec1` should run *outside* (first applied, last executed) and `dec2` *inside*.

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
if val == "12Hello":
    print("Correct!")
else:
    print(f"Got {val}")
> Expected Output: Correct!

## Question 5: Handling Arguments
Update the wrapper to accept any positional arguments (`*args`) and pass them to `func`.

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
assert add(2, 3) == 5
print("Correct!")
> Expected Output: Correct!

## Question 6: Simple Logger
Write a decorator `log_execution` that prints "Executing" before running the function.

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
# Expecting "Executing" then "Hello"
lines = output.split('\n')
if len(lines) >= 2 and "Executing" in lines[0] and "Hello" in lines[1]:
    print("Correct!")
else:
    print(f"Output was: {output}")
> Expected Output: Correct!
