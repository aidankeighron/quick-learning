---
title: "Context Managers"
description: "Managing resources with the with statement."
order: 3
difficulty: "Intermediate"
---

## Question 1: Context Manager Syntax
Which keyword handles the entry and exit of a context manager?

- [ ] using
- [x] with
- [ ] context
- [ ] guard

> Hint: Used commonly for opening files.
> Explanation: The `with` statement ensures proper resource management.

## Question 2: Entry Method
Which method is called when entering a `with` block?

- [ ] __init__
- [ ] __start__
- [x] __enter__
- [ ] __open__

> Hint: It sets up the context.
> Explanation: `__enter__` is called at the start of the `with` block.

## Question 3: Exit Method
Which method is called when exiting a `with` block?

- [ ] __close__
- [ ] __stop__
- [x] __exit__
- [ ] __end__

> Hint: It handles cleanup.
> Explanation: `__exit__` is called when the block ends, even if an exception occurred.

## Question 4: Exception Handling
Can a context manager suppress exceptions?

- [ ] No, never
- [ ] Only KeyboardInterrupt
- [x] Yes, if __exit__ returns True
- [ ] Yes, automatically

> Hint: The return value of `__exit__` matters.
> Explanation: If `__exit__` returns `True`, the exception is suppressed.

## Question 5: Library Helper
Which module provides the `@contextmanager` decorator to create simple context managers from generators?

- [ ] functools
- [x] contextlib
- [ ] itertools
- [ ] sys

> Hint: The name helps with context.
> Explanation: `contextlib.contextmanager` allows defining context managers using generator syntax.

## Question 6: File Opening
Write a `with` statement to open a file named "test.txt" in write mode (`"w"`) as `f` (this is conceptual, no file I/O will actually persist).

> Type: code
> Language: python
> Expected Output: 
