---
title: "SQL Basics"
description: "Fundamental commands: SELECT, WHERE, ORDER BY."
order: 1
difficulty: "Beginner"
---

## Question 1: Select All
Retrieve all columns from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select everything from Users
> Verification Code:
SELECT * FROM Users;
> Expected Output:
1 | Alice Smith | alice@example.com | USA | 2023-01-15
2 | Bob Jones | bob@example.com | UK | 2023-02-20
3 | Charlie Brown | charlie@example.com | Canada | 2023-03-10
4 | Diana Prince | diana@example.com | USA | 2023-01-05
5 | Evan Wright | evan@example.com | Australia | 2023-04-12

## Question 2: Select Specific Columns
Select only the `name` and `country` columns from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select name and country
> Verification Code:
SELECT name, country FROM Users;
> Expected Output:
Alice Smith | USA
Bob Jones | UK
Charlie Brown | Canada
Diana Prince | USA
Evan Wright | Australia

## Question 3: Filtering with WHERE
Select all columns from `Orders` where the `status` is 'Completed'.

> Type: code
> Language: sql
> Starting Code:
-- Select completed orders
> Verification Code:
SELECT * FROM Orders WHERE status = 'Completed';
> Expected Output:
101 | 1 | 150.5 | Completed | 2023-05-01
103 | 1 | 45 | Completed | 2023-05-05

## Question 4: Sorting Results
Select all columns from `Products` ordered by `price` in descending order relative to largest first (DESC).

> Type: code
> Language: sql
> Starting Code:
-- Order products by price (High to Low)
> Verification Code:
SELECT * FROM Products ORDER BY price DESC;
> Expected Output:
1 | Laptop | Electronics | 999.99 | 10
2 | Smartphone | Electronics | 699.99 | 20
5 | Headphones | Electronics | 199.99 | 30
3 | Desk Chair | Furniture | 149.99 | 15
4 | Coffee Table | Furniture | 89.99 | 5

## Question 5: Multiple Conditions
Select all `Products` where the `category` is 'Electronics' AND the `price` is greater than 500.

> Type: code
> Language: sql
> Starting Code:
-- Filter electronics over 500
> Verification Code:
SELECT * FROM Products WHERE category = 'Electronics' AND price > 500;
> Expected Output:
1 | Laptop | Electronics | 999.99 | 10
2 | Smartphone | Electronics | 699.99 | 20

## Question 6: Limiting Results
Select the first 3 rows from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select first 3 users
> Verification Code:
SELECT * FROM Users LIMIT 3;
> Expected Output:
1 | Alice Smith | alice@example.com | USA | 2023-01-15
2 | Bob Jones | bob@example.com | UK | 2023-02-20
3 | Charlie Brown | charlie@example.com | Canada | 2023-03-10 
