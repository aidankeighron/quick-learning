---
title: "Magic Methods"
description: "Understand dunder methods like __init__, __str__, and __len__."
---

## Question 1: Initialization
Which method is automatically called when a new object is created?

- [ ] __create__
- [ ] __new__
- [x] __init__
- [ ] __start__

> Hint: It initializes the object's state.
> Explanation: `__init__` is the constructor method in Python. `__new__` creates the instance, but `__init__` initializes it.

## Question 2: String Representation
Which method returns a human-readable string representation of an object?

- [ ] __repr__
- [ ] __string__
- [ ] __text__
- [x] __str__

> Hint: This is what `print(obj)` uses.
> Explanation: `__str__` is intended to be readable. `__repr__` is intended to be unambiguous.

## Question 3: Length Customization
Which method allows an object to support the `len()` function?

- [ ] __length__
- [ ] __size__
- [x] __len__
- [ ] __count__

> Hint: It should return an integer.
> Explanation: Implementing `__len__` allows you to use `len(my_object)`.

## Question 4: Arithmetic Operations
which method allows you to define behavior for the `+` operator?

- [ ] __addition__
- [ ] __plus__
- [x] __add__
- [ ] __sum__

> Hint: Think of "add".
> Explanation: `__add__` defines behavior for `+`.

## Question 5: Item Access
Which method allows you to access items using square bracket notation `obj[key]`?

- [ ] __get__
- [ ] __access__
- [x] __getitem__
- [ ] __index__

> Hint: You are "getting an item".
> Explanation: `__getitem__` is used for indexing/lookup.

## Question 6: Custom String Output
Create a class `Person` that accepts a `name` in `__init__` and returns that name when `str()` is called on the instance.

> Type: code
> Language: python
> Expected Output: Alice
