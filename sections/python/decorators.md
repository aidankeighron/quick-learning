---
title: "Decorators"
description: "Modify function behavior with higher-order functions."
---

## Question 1: Decorator Syntax
What symbol is used to apply a decorator to a function?

- [ ] &
- [ ] %
- [x] @
- [ ] #

> Hint: It's placed above the function definition.
> Explanation: The `@` symbol (pie syntax) is used for decorators.

## Question 2: What returns a decorator?
A decorator is a function that takes a function as input and returns...

- [ ] A class
- [ ] A string
- [x] A function
- [ ] None

> Hint: It wraps the original function.
> Explanation: Decorators return a wrapper function that extends behavior.

## Question 3: Wrapping Metadata
Which decorator from `functools` should be used to preserve the original function's metadata (name, docstring)?

- [ ] @preserve
- [ ] @metadata
- [x] @wraps
- [ ] @keep

> Hint: It wraps the wrapper.
> Explanation: `@functools.wraps` copies metadata from the original function to the wrapper.

## Question 4: Chaining Decorators
If you apply two decorators, which one runs first?

- [ ] The top one
- [x] The one closest to the function definition (bottom one)
- [ ] Random order
- [ ] Parallel

> Hint: Think of it as f(g(x)).
> Explanation: Decorators are applied from bottom to top (inner to outer).

## Question 5: Arguments in Decorators
How do you handle arbitrary arguments in a wrapper function?

- [ ] Use a list
- [ ] Use explicit arguments
- [x] Use *args and **kwargs
- [ ] Use the `arguments` keyword

> Hint: This captures any positional or keyword arguments.
> Explanation: `*args` and `**kwargs` allow the wrapper to accept any signature.

## Question 6: Simple Logger
Write a decorator `log_execution` (conceptually) that prints "Executing" before running the function. For this test, just define a function `hello` that prints "Hello" and call it.

> Type: code
> Language: python
> Expected Output: Hello
