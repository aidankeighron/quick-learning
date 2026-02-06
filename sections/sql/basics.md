---
title: "SQL Basics"
description: "Fundamental commands: SELECT, WHERE, ORDER BY."
order: 1
difficulty: "Beginner"
---

## Question 1: Data Retrieval
Which SQL keyword is used to retrieve data from a database?

> Type: multiple-choice
- [ ] GET
- [ ] FETCH
- [x] SELECT
- [ ] PULL

## Question 2: Filtering Records
Which clause is used to filter records?

> Type: multiple-choice
- [ ] FILTER
- [x] WHERE
- [ ] WHEN
- [ ] IF

## Question 3: Select All
Retrieve all columns from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select everything from Users
> Verification Code:
SELECT * FROM Users;
> Expected Output:
1 | Alice Smith | alice@example.com | USA | 2023-01-15...

## Question 4: Select Specific Columns
Select only the `name` and `country` columns from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select name and country
> Verification Code:
SELECT name, country FROM Users;
> Expected Output:
Alice Smith | USA
Bob Jones | UK...

## Question 5: Sorting Direction
Which keyword sorts result in descending order?

> Type: multiple-choice
- [ ] DOWN
- [x] DESC
- [ ] REVERSE
- [ ] ASC

## Question 6: Unique Values
How do you select only distinct (different) values?

> Type: multiple-choice
- [ ] SELECT UNIQUE
- [x] SELECT DISTINCT
- [ ] SELECT DIFFERENT
- [ ] SELECT SINGLE

## Question 7: Filtering with WHERE
Select all columns from `Orders` where the `status` is 'Completed'.

> Type: code
> Language: sql
> Starting Code:
-- Select completed orders
> Verification Code:
SELECT * FROM Orders WHERE status = 'Completed';
> Expected Output:
101 | 1 | 150.5 | Completed...

## Question 8: Sorting Results
Select all columns from `Products` ordered by `price` in descending order relative to largest first (DESC).

> Type: code
> Language: sql
> Starting Code:
-- Order products by price (High to Low)
> Verification Code:
SELECT * FROM Products ORDER BY price DESC;
> Expected Output:
1 | Laptop | Electronics | 999.99...

## Question 9: Multiple Conditions
Select all `Products` where the `category` is 'Electronics' AND the `price` is greater than 500.

> Type: code
> Language: sql
> Starting Code:
-- Filter electronics over 500
> Verification Code:
SELECT * FROM Products WHERE category = 'Electronics' AND price > 500;
> Expected Output:
1 | Laptop | Electronics | 999.99...

## Question 10: Limiting Results
Select the first 3 rows from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select first 3 users
> Verification Code:
SELECT * FROM Users LIMIT 3;
> Expected Output:
1 | Alice Smith...
2 | Bob Jones...
3 | Charlie Brown...
