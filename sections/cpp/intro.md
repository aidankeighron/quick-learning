---
title: "C++ Basics"
description: "Pointers, Memory, and Compilation."
order: 1
difficulty: "Intermediate"
---

## Question 1: Feature
What is a key feature of C++ that distinguishes it from C?

> Type: multiple-choice
- [ ] Garbage Collection
- [x] Classes and Objects (OOP)
- [ ] Runs in VM
- [ ] Dynamic Typing

## Question 2: Hello World
This uses `clang` running in your browser via WebAssembly!

> Type: code
> Language: cpp
> Starting Code:
#include <stdio.h>

int main() {
    printf("Hello C++");
    return 0;
}
> Verification Code:
if (!output.includes("Hello C++")) throw new Error("Expected output 'Hello C++', got: " + output);
console.log("Correct!");
> Expected Output: Correct!

## Question 3: Simple Loop
Write a loop that prints numbers 0 to 4 (newline separated).

> Type: code
> Language: cpp
> Starting Code:
#include <stdio.h>

int main() {
    // Write for loop
    return 0;
}
> Verification Code:
if (!output.includes("0\n1\n2\n3\n4")) throw new Error("Expected 0 to 4 on newlines");
console.log("Correct!");
> Expected Output: Correct!
