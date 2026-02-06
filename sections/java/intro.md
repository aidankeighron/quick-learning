---
title: "Java Basics"
description: "Classes, Main Method, and Compilation."
order: 1
difficulty: "Beginner"
---

## Question 1: Java Virtual Machine
What is the role of the JVM?

> Link: https://www.w3schools.com/java/java_intro.asp
> Type: multiple-choice
- [ ] Compiles source code to machine code
- [x] Executes Java Bytecode
- [ ] Writes Java code for you
- [ ] Connects to the internet

## Question 2: Main Method
In Java, what is the entry point of the application?

> Link: https://www.w3schools.com/java/java_syntax.asp
> Type: multiple-choice
- [ ] start()
- [ ] run()
- [ ] init()
- [x] public static void main(String[] args)

## Question 3: Hello World
This code runs a real Java compiler in your browser! 
Complete the `main` method to print `"Hello Java"`.

> Link: https://www.w3schools.com/java/java_output.asp
> Type: code
> Language: java
> Starting Code:
public class Main {
    public static void main(String[] args) {
        // Print "Hello Java"
        System.out.println("Goodbye");
    }
}
> Verification Code:
if (!output.includes("Hello Java")) throw new Error("Expected output to contain 'Hello Java', got: " + output);
if (output.includes("Goodbye")) throw new Error("You should replace 'Goodbye' with 'Hello Java'");
console.log("Correct!");
> Expected Output: Correct!

## Question 4: Basic Math
Modify the code to print the sum of 10 and 20.

> Link: https://www.w3schools.com/java/java_variables.asp
> Type: code
> Language: java
> Starting Code:
public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        // Print the sum
    }
}
> Verification Code:
// Check output for "30"
// Since output includes other potential logs, we just check inclusion.
const lines = output.trim().split("\n");
const lastLine = lines[lines.length - 1];
if (!lastLine.includes("30")) throw new Error("Expected output to be 30, got: " + lastLine);
console.log("Correct!");
> Expected Output: Correct!
