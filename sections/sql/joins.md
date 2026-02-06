---
title: "Joins"
description: "Combining rows from two or more tables."
---

## Question 1: Join Purpose
What is a JOIN used for?

- [ ] To delete tables
- [x] To combine rows from two or more tables based on a related column
- [ ] To create a new database
- [ ] To sort data

> Hint: It links tables together.
> Explanation: JOINs are used to query data from multiple tables simultaneously.

## Question 2: Inner Join
Which JOIN returns records that have matching values in *both* tables?

- [ ] LEFT JOIN
- [ ] RIGHT JOIN
- [x] INNER JOIN
- [ ] FULL JOIN

> Hint: The intersection of two sets.
> Explanation: `INNER JOIN` selects records that have matching values in both tables.

## Question 3: Left Join
Which JOIN returns all records from the left table, and the matched records from the right table?

- [x] LEFT JOIN
- [ ] RIGHT JOIN
- [ ] INNER JOIN
- [ ] OUTER JOIN

> Hint: Preserves the "left" side.
> Explanation: `LEFT JOIN` returns matching records from the right table, or NULL if no match is found.

## Question 4: Cartesian Product
What happens if you join two tables without a join condition (e.g., `CROSS JOIN`)?

- [ ] Error
- [ ] Returns unmatched rows only
- [x] Returns the Cartesian product (all combinations)
- [ ] Returns nothing

> Hint: Every row from table A paired with every row from table B.
> Explanation: It creates a combination of every row in the first table with every row in the second table.

## Question 5: Join Syntax
What keyword follows the table name in a `JOIN` clause to specify the matching condition?

- [ ] WITH
- [ ] BY
- [x] ON
- [ ] EQUALS

> Hint: `JOIN TableB ... TableA.id = TableB.a_id`
> Explanation: The `ON` keyword specifies the column relationship.

## Question 6: Join Challenge
List all orders with the name of the user who placed them.
Write a query to select `name` from `Users` and `amount` from `Orders`. Join them on `Users.id = Orders.user_id`.

> Type: code
> Language: sql
> Expected Output: 
