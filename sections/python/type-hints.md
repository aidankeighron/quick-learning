---
title: "Type Hints"
description: "Learn how to use Python's typing system to write better code."
order: 6
difficulty: "Intermediate"
---

## Question 1: Basic Variable Types
Annotate the variables `name` (string) and `age` (integer).

> Type: code
> Language: python
> Starting Code:
name = "Alice"
age = 30
> Verification Code:
# We can't easily check runtime types of variables in a script scope statically without parsing
# But we can check __annotations__ if we wrap in a function or check the module globals if available?
# Simpler: check if `__annotations__` exists in globals.
# In a script execution `exec`, globals include annotations.
assert 'name' in __annotations__, "Variable 'name' is missing a type annotation"
assert 'age' in __annotations__, "Variable 'age' is missing a type annotation"
assert __annotations__['name'] == str, "Expected 'name' to be type str"
assert __annotations__['age'] == int, "Expected 'age' to be type int"
print("Correct!")
> Expected Output: Correct!

## Question 2: Function Arguments
Add type hints to the function `greet` so `name` is a string and it returns a string.

> Type: code
> Language: python
> Starting Code:
def greet(name):
    return f"Hello, {name}"
> Verification Code:
assert greet.__annotations__['name'] == str, "Argument 'name' should be typed as str"
assert greet.__annotations__['return'] == str, "Return type should be str"
print("Correct!")
> Expected Output: Correct!

## Question 3: Lists
Import `List` from `typing` (or use built-in `list` for Python 3.9+) and annotate `scores` as a list of integers.

> Type: code
> Language: python
> Starting Code:
from typing import List

scores = [10, 20, 30]
> Verification Code:
# Allow both List[int] or list[int]
import typing
# Check annotation
assert 'scores' in __annotations__, "Variable 'scores' not annotated"
anno = __annotations__['scores']
# It's hard to equality check generic aliases exactly across versions, checks string or origin
# Simplified check:
assert str(anno).replace("typing.", "").startswith("List[int]") or str(anno) == "list[int]", f"Expected List[int], got {anno}"
print("Correct!")
> Expected Output: Correct!

## Question 4: Dictionaries
Annotate `user_data` as a dictionary where keys are strings and values are integers.

> Type: code
> Language: python
> Starting Code:
from typing import Dict

user_data = {"id": 1, "rank": 5}
> Verification Code:
assert 'user_data' in __annotations__, "Variable 'user_data' not annotated"
anno = __annotations__['user_data']
assert "Dict[str, int]" in str(anno) or "dict[str, int]" in str(anno), f"Expected Dict[str, int], got {anno}"
print("Correct!")
> Expected Output: Correct!

## Question 5: Optional Types
Use `Optional` from `typing` to annotate `middle_name` which can be a string or `None`.

> Type: code
> Language: python
> Starting Code:
from typing import Optional

middle_name = None
> Verification Code:
assert 'middle_name' in __annotations__, "Variable 'middle_name' not annotated"
anno = __annotations__['middle_name']
# Optional[str] is Union[str, None]
assert "Optional[str]" in str(anno) or "Union[str, NoneType]" in str(anno) or "str | None" in str(anno), f"Expected Optional[str], got {anno}"
print("Correct!")
> Expected Output: Correct!

## Question 6: Union Types
Use `Union` to write a function `double(value)` that accepts either an `int` or a `float`, and returns the same type.

> Type: code
> Language: python
> Starting Code:
from typing import Union

def double(value):
    return value * 2
> Verification Code:
annos = double.__annotations__
assert 'value' in annos, "Argument 'value' missing type"
assert "Union[int, float]" in str(annos['value']) or "int | float" in str(annos['value']), "Argument type should be Union[int, float]"
assert "Union[int, float]" in str(annos['return']) or "int | float" in str(annos['return']), "Return type should be Union[int, float]"
print("Correct!")
> Expected Output: Correct!
