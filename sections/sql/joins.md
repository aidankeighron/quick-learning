---
title: "Joins"
description: "Combining rows from two or more tables."
order: 2
difficulty: "Intermediate"
---

## Question 1: Inner Join Purpose
What does an INNER JOIN return?

> Link: https://www.w3schools.com/sql/sql_join_inner.asp
> Type: multiple-choice
- [ ] All rows from both tables
- [x] Only rows with matching values in both tables
- [ ] All rows from the left table
- [ ] All rows from the right table

## Question 2: Left Join Behavior
In a LEFT JOIN, what happens if there is no match in the right table?

> Link: https://www.w3schools.com/sql/sql_join_left.asp
> Type: multiple-choice
- [ ] The row is excluded
- [ ] An error occurs
- [x] The result is NULL from the right side
- [ ] The row is duplicated

## Question 3: Basic Inner Join
Perform an INNER JOIN between `Users` and `Orders` on `id` and `user_id`. Select all columns.

> Link: https://www.w3schools.com/sql/sql_join_inner.asp
> Type: code
> Language: sql
> Starting Code:
-- Select * from Users JOIN Orders ...
> Verification Code:
SELECT * FROM Users JOIN Orders ON Users.id = Orders.user_id;
> Expected Output:
1 | Alice Smith... | 101...

## Question 4: Left Join
Perform a LEFT JOIN taking all records from `Users` and matching `Orders`. Some users may have no orders (NULL).

> Link: https://www.w3schools.com/sql/sql_join_left.asp
> Type: code
> Language: sql
> Starting Code:
-- Users LEFT JOIN Orders
> Verification Code:
SELECT * FROM Users LEFT JOIN Orders ON Users.id = Orders.user_id;
> Expected Output:
1 | Alice Smith...
...
4 | Diana Prince | ... | None...

## Question 5: Join Types
Which join returns all records when there is a match in either left or right table?

> Link: https://www.w3schools.com/sql/sql_join_full.asp
> Type: multiple-choice
- [ ] INNER JOIN
- [ ] LEFT JOIN
- [x] FULL OUTER JOIN
- [ ] RIGHT JOIN

## Question 6: Cartesian Product
Which join creates a Cartesian product (every row combined with every row)?

> Link: https://www.w3schools.com/sql/sql_join.asp
> Type: multiple-choice
- [ ] INNER JOIN
- [x] CROSS JOIN
- [ ] SELF JOIN
- [ ] NATURAL JOIN

## Question 7: Selecting Specific Columns in Join
Select `Users.name` and `Orders.amount` using an INNER JOIN.

> Link: https://www.w3schools.com/sql/sql_join_inner.asp
> Type: code
> Language: sql
> Starting Code:
-- Select name, amount ...
> Verification Code:
SELECT Users.name, Orders.amount FROM Users JOIN Orders ON Users.id = Orders.user_id;
> Expected Output:
Alice Smith | 150.5...

## Question 8: Filtering Joins
Select `name` and `amount` for only 'Completed' orders.

> Link: https://www.w3schools.com/sql/sql_join_inner.asp
> Type: code
> Language: sql
> Starting Code:
-- Select name, amount WHERE status is Completed
> Verification Code:
SELECT Users.name, Orders.amount FROM Users JOIN Orders ON Users.id = Orders.user_id WHERE Orders.status = 'Completed';
> Expected Output:
Alice Smith | 150.5...

## Question 9: Join with Alias
Use aliases (`u` for Users, `o` for Orders) to select `u.name` and `o.status`.

> Link: https://www.w3schools.com/sql/sql_join_inner.asp
> Type: code
> Language: sql
> Starting Code:
-- SELECT ... FROM Users u JOIN Orders o ...
> Verification Code:
SELECT u.name, o.status FROM Users u JOIN Orders o ON u.id = o.user_id;
> Expected Output:
Alice Smith | Completed...

## Question 10: Cross Join
Perform a CROSS JOIN between `Users` and `Products`. This will create a row for every user/product combination.

> Link: https://www.w3schools.com/sql/sql_join.asp
> Type: code
> Language: sql
> Starting Code:
-- CROSS JOIN
> Verification Code:
SELECT * FROM Users CROSS JOIN Products;
> Expected Output:
(Many rows returned)
