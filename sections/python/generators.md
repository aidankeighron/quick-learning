---
title: "Generators"
description: "Lazy evaluation with yield and iterators."
---

## Question 1: Generator Syntax
Which keyword turns a function into a generator?

- [ ] return
- [ ] gen
- [x] yield
- [ ] emit

> Hint: It pauses execution and produces a value.
> Explanation: `yield` produces a value and pauses the function, saving its state.

## Question 2: Memory Efficiency
Why are generators often more memory efficient than lists?

- [ ] They are compressed
- [x] They generate values one at a time on demand
- [ ] They store values on disk
- [ ] They use C pointers

> Hint: Think about "lazy" evaluation.
> Explanation: Generators do not store all values in memory; they calculate them on the fly.

## Question 3: Getting Next Value
Which function retrieves the next value from a generator?

- [ ] get()
- [x] next()
- [ ] continue()
- [ ] yield()

> Hint: It advances the iterator.
> Explanation: `next(gen)` or `gen.__next__()` resumes execution until the next yield.

## Question 4: Stop Iteration
What exception is raised when a generator is exhausted?

- [ ] EndOfList
- [x] StopIteration
- [ ] GeneratorExit
- [ ] Done

> Hint: Loops handle this exception automatically.
> Explanation: `StopIteration` signals that there are no more items.

## Question 5: Generator Expressions
Which syntax creates a generator expression?

- [ ] [x for x in range(10)]
- [ ] {x for x in range(10)}
- [x] (x for x in range(10))
- [ ] <x for x in range(10)>

> Hint: It looks like a list comprehension but with parentheses.
> Explanation: Parentheses `()` are used for generator expressions.

## Question 6: Simple Generator
Write a generator function `count_up_to(n)` that yields numbers from 1 to `n`.

> Type: code
> Language: python
> Expected Output: 
