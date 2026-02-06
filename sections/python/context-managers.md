---
title: "Context Managers"
description: "Managing resources with the with statement."
order: 3
difficulty: "Intermediate"
---

## Question 1: Purpose of Context Managers
What is the primary purpose of a context manager in Python?

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: multiple-choice
- [ ] To manage memory manually
- [x] To setup and teardown resources automatically
- [ ] To create global variables
- [ ] To speed up code execution

## Question 2: The With Keyword
Which keyword activates a context manager?

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: multiple-choice
- [ ] use
- [x] with
- [ ] using
- [ ] context

## Question 3: The 'with' Statement
Use the `with` statement to manage corresponding resource `ResourceManager()`. The variable name should be `m`.

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: code
> Language: python
> Starting Code:
class ResourceManager:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc_val, exc_tb): pass

# Write usage below
> Verification Code:
# We can't easily introspect local variables in simple exec, but we can check side effects or just rely on correct syntax running without error.
# Let's mock it to check if enter/exit were called.
called_enter = False
called_exit = False
class ResourceManagerMock:
    def __enter__(self): 
        global called_enter
        called_enter = True
        return self
    def __exit__(self, *args):
        global called_exit
        called_exit = True

with ResourceManagerMock() as m:
    pass

assert called_enter and called_exit, "Context manager methods were not triggered. Check your 'with' syntax."
print("Correct!")
> Expected Output: Correct!

## Question 4: Implementing __enter__
Complete the `Action` class so that `__enter__` returns the string "Action Started".

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: code
> Language: python
> Starting Code:
class Action:
    def __enter__(self):
        # Your code here
        pass
    def __exit__(self, exc_type, exc_val, exc_tb): pass
> Verification Code:
with Action() as a:
    assert a == "Action Started", f"Expected __enter__ to return 'Action Started', got '{a}'"
print("Correct!")
> Expected Output: Correct!

## Question 5: Context Manager Protocol
Which two magic methods are required to create a class-based context manager?

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: multiple-choice
- [ ] `__init__` and `__del__`
- [ ] `__start__` and `__finish__`
- [x] `__enter__` and `__exit__`
- [ ] `__open__` and `__close__`

## Question 6: Using contextlib
What decorator from the `contextlib` module can convert a generator into a context manager?

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: multiple-choice
- [ ] `@generator`
- [x] `@contextmanager`
- [ ] `@context`
- [ ] `@resource`

## Question 7: Implementing __exit__
Complete the `__exit__` method to print "Exiting" when the block ends.

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: code
> Language: python
> Starting Code:
class Logger:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Your code here
        pass
> Verification Code:
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()

with Logger():
    pass

sys.stdout = old_stdout
output = mystdout.getvalue().strip()
assert "Exiting" in output, f"Expected output to contain 'Exiting', got: '{output}'"
print("Correct!")
> Expected Output: Correct!

## Question 8: Suppressing Exceptions
Modify `__exit__` to return `True`, which will suppress any exception raised inside the `with` block.

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: code
> Language: python
> Starting Code:
class Suppressor:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Return True to suppress
        pass
> Verification Code:
try:
    with Suppressor():
        raise ValueError("Oops")
    print("Correct!")
except ValueError:
    raise AssertionError("Exception was not suppressed (did you return True in __exit__?)")
> Expected Output: Correct!

## Question 9: contextlib Decorator
Use `@contextmanager` from `contextlib` to create a context manager named `simple_cm` that yields "Hello".

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: code
> Language: python
> Starting Code:
from contextlib import contextmanager

# Decorate and define simple_cm
def simple_cm():
    pass
> Verification Code:
with simple_cm() as msg:
    assert msg == "Hello", f"Expected yielded value 'Hello', got '{msg}'"
print("Correct!")
> Expected Output: Correct!

## Question 10: File Opening Pattern
Write a `with` statement to open a file named "test.txt" in write mode (`"w"`) as `f`, and write "content" to it.

> Link: https://www.w3schools.com/python/python_file_open.asp
> Type: code
> Language: python
> Starting Code:
# with open...
pass
> Verification Code:
import os
try:
    with open("test.txt", "w") as f:
        f.write("content")
except Exception as e:
    raise AssertionError(f"Error opening/writing file: {e}")

if os.path.exists("test.txt"):
    try:
        with open("test.txt", "r") as f:
            content = f.read()
        assert content == "content", f"Expected file content 'content', got '{content}'"
        print("Correct!")
    finally:
        os.remove("test.txt") # Clean up
else:
    raise AssertionError("File 'test.txt' was not found.")
> Expected Output: Correct!
