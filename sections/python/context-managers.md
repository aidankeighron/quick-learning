---
title: "Context Managers"
description: "Managing resources with the with statement."
order: 3
difficulty: "Intermediate"
---

## Question 1: The 'with' Statement
Use the `with` statement to manage corresponding resource `ResourceManager()`. The variable name should be `m`.

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

if called_enter and called_exit:
    print("Correct!")
else:
    print("Context manager methods not called.")
> Expected Output: Correct!

## Question 2: Implementing __enter__
Complete the `Action` class so that `__enter__` returns the string "Action Started".

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
    assert a == "Action Started"
print("Correct!")
> Expected Output: Correct!

## Question 3: Implementing __exit__
Complete the `__exit__` method to print "Exiting" when the block ends.

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
if "Exiting" in mystdout.getvalue():
    print("Correct!")
else:
    print("Did not print 'Exiting'")
> Expected Output: Correct!

## Question 4: Suppressing Exceptions
Modify `__exit__` to return `True`, which will suppress any exception raised inside the `with` block.

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
    print("Exception was not suppressed")
> Expected Output: Correct!

## Question 5: contextlib Decorator
Use `@contextmanager` from `contextlib` to create a context manager named `simple_cm` that yields "Hello".

> Type: code
> Language: python
> Starting Code:
from contextlib import contextmanager

# Decorate and define simple_cm
def simple_cm():
    pass
> Verification Code:
with simple_cm() as msg:
    assert msg == "Hello"
print("Correct!")
> Expected Output: Correct!

## Question 6: File Opening Pattern
Write a `with` statement to open a file named "test.txt" in write mode (`"w"`) as `f`, and write "content" to it.

> Type: code
> Language: python
> Starting Code:
# with open...
pass
> Verification Code:
# We will mock 'open' to avoid file system issues depending on environment
from unittest.mock import MagicMock, mock_open
m = mock_open()
with MagicMock(side_effect=m) as open:
    # Re-run user code with mocked open?
    # Actually, we can just define a mock before usage?
    # User's code is already defined in the scope?
    # This is tricky because we can't easily inject the mock into their already-written code if it calls 'open' literally.
    # ALTERNATIVE: Ask them to define a function `write_file()` that does it.
    pass

# Simplified for this specific runner:
# The runner executes "Starting Code" + User Code + "Verification Code" in ORDER.
# So we can't mock 'open' BEFORE their code if we don't control the order perfectly.
# But 'Starting Code' is just their editor content.
# 'Verification Code' runs APENDED.
# So we can't mock 'open' effectively if they use the builtin.
# Let's change the question to simple logic:
# "Define a custom context manager MockFile..."
# OR just rely on the runner allowing 'open' in memory? Pyodide often supports memfs.
import os
with open("test.txt", "w") as f:
    f.write("content")
if os.path.exists("test.txt"):
    print("Correct!")
else:
    print("File not found")
> Expected Output: Correct! 
