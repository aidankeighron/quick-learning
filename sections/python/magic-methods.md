---
title: "Magic Methods"
description: "Understand dunder methods like __init__, __str__, and __len__."
order: 5
difficulty: "Advanced"
---

## Question 1: What are Magic Methods?
What distinguishes magic methods (dunder methods) in Python?

> Type: multiple-choice
- [ ] They disappear after use
- [x] They start and end with double underscores
- [ ] They are only used in functional programming
- [ ] They optimize code speed

## Question 2: Constructor
Which magic method is commonly known as the constructor/initializer?

> Type: multiple-choice
- [ ] `__new__`
- [x] `__init__`
- [ ] `__create__`
- [ ] `__construct__`

## Question 3: Initialization (__init__)
Define a class `Person` with an `__init__` method that assigns the argument `name` to `self.name`.

> Type: code
> Language: python
> Starting Code:
class Person:
    def __init__(self, name):
        # Assign self.name
        pass
> Verification Code:
p = Person("Alice")
assert p.name == "Alice", f"Expected name 'Alice', got '{p.name}'"
print("Correct!")
> Expected Output: Correct!

## Question 4: String Representation (__str__)
Define a `__str__` method for `Person` that returns the string "Person: [name]".

> Type: code
> Language: python
> Starting Code:
class Person:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        # Return formatted string
        pass
> Verification Code:
p = Person("Bob")
assert str(p) == "Person: Bob", f"Expected 'Person: Bob', got '{str(p)}'"
print("Correct!")
> Expected Output: Correct!

## Question 5: Debug Representation
What is `__repr__` primarily used for?

> Type: multiple-choice
- [ ] User-friendly string output
- [x] Unambiguous representation for debugging
- [ ] Representing numbers
- [ ] Creating copies

## Question 6: Operator Overloading
Which method implements the '+' operator?

> Type: multiple-choice
- [ ] `__plus__`
- [ ] `__sum__`
- [x] `__add__`
- [ ] `__math__`

## Question 7: Length (__len__)
Define a class `Container` with a list `items`. Implement `__len__` to return the number of items.

> Type: code
> Language: python
> Starting Code:
class Container:
    def __init__(self, items):
        self.items = items
    
    def __len__(self):
        # Return length of self.items
        pass
> Verification Code:
c = Container([1, 2, 3])
assert len(c) == 3, f"Expected length 3, got {len(c)}"
print("Correct!")
> Expected Output: Correct!

## Question 8: Addition (__add__)
Define a class `Point` with `x` and `y`. Implement `__add__` to return a new `Point` that is the sum of two points (add x's and y's).

> Type: code
> Language: python
> Starting Code:
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        # Return new Point
        pass
> Verification Code:
p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2
assert p3.x == 4 and p3.y == 6, f"Expected Point(4, 6), got Point({p3.x}, {p3.y})"
print("Correct!")
> Expected Output: Correct!

## Question 9: Item Access (__getitem__)
Define a class `Wrapper` that holds a list `data`. Implement `__getitem__` to allow indexing `wrapper[index]`.

> Type: code
> Language: python
> Starting Code:
class Wrapper:
    def __init__(self, data):
        self.data = data
    
    def __getitem__(self, index):
        # Return item from self.data
        pass
> Verification Code:
w = Wrapper(['a', 'b', 'c'])
assert w[1] == 'b', f"Expected 'b' at index 1, got '{w[1]}'"
print("Correct!")
> Expected Output: Correct!

## Question 10: Complete Class
Create a class `Counter` that starts at 0. Implement `__add__` to add an integer to the counter, and `__str__` to return the current count as a string.

> Type: code
> Language: python
> Starting Code:
class Counter:
    def __init__(self):
        self.count = 0
    
    # Implement __add__ (handle: self + int)
    # Note: normally __add__ returns a new object, but here let's just increment self.count? 
    # Actually standard __add__ returns new. Let's make it mutable add (+=) or just return new?
    # Let's say: return NEW Counter with sum.
    def __add__(self, other):
        pass

    def __str__(self):
        pass
> Verification Code:
c1 = Counter()
c2 = c1 + 5
assert c2.count == 5, f"Expected count 5, got {c2.count}"
assert c1.count == 0, "Original counter modified (should be new object)"
assert str(c2) == "5", f"Expected string '5', got '{str(c2)}'"
print("Correct!")
> Expected Output: Correct!
