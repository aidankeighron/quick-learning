---
title: "Joins"
description: "Combining rows from two or more tables."
order: 2
difficulty: "Intermediate"
---

## Question 1: Basic Inner Join
Perform an INNER JOIN between `Users` and `Orders` on `id` and `user_id`. Select all columns.

> Type: code
> Language: sql
> Starting Code:
-- Select * from Users JOIN Orders ...
> Verification Code:
SELECT * FROM Users JOIN Orders ON Users.id = Orders.user_id;
> Expected Output:
1 | Alice Smith | alice@example.com | USA | 2023-01-15 | 101 | 1 | 150.5 | Completed | 2023-05-01
1 | Alice Smith | alice@example.com | USA | 2023-01-15 | 103 | 1 | 45 | Completed | 2023-05-05
2 | Bob Jones | bob@example.com | UK | 2023-02-20 | 102 | 2 | 89.99 | Pending | 2023-05-03
3 | Charlie Brown | charlie@example.com | Canada | 2023-03-10 | 104 | 3 | 200 | Shipped | 2023-05-06
5 | Evan Wright | evan@example.com | Australia | 2023-04-12 | 105 | 5 | 35 | Cancelled | 2023-05-07

## Question 2: Left Join
Perform a LEFT JOIN taking all records from `Users` and matching `Orders`. Some users may have no orders (NULL).

> Type: code
> Language: sql
> Starting Code:
-- Users LEFT JOIN Orders
> Verification Code:
SELECT * FROM Users LEFT JOIN Orders ON Users.id = Orders.user_id;
> Expected Output:
1 | Alice Smith | ... | 101 | ...
2 | Bob Jones | ... | 102 | ...
3 | Charlie Brown | ... | 104 | ...
4 | Diana Prince | ... | None | None ...
5 | Evan Wright | ... | 105 | ...

## Question 3: Selecting Specific Columns in Join
Select `Users.name` and `Orders.amount` using an INNER JOIN.

> Type: code
> Language: sql
> Starting Code:
-- Select name, amount ...
> Verification Code:
SELECT Users.name, Orders.amount FROM Users JOIN Orders ON Users.id = Orders.user_id;
> Expected Output:
Alice Smith | 150.5
Alice Smith | 45
Bob Jones | 89.99
Charlie Brown | 200
Evan Wright | 35

## Question 4: Filtering Joins
Select `name` and `amount` for only 'Completed' orders.

> Type: code
> Language: sql
> Starting Code:
-- Select name, amount WHERE status is Completed
> Verification Code:
SELECT Users.name, Orders.amount FROM Users JOIN Orders ON Users.id = Orders.user_id WHERE Orders.status = 'Completed';
> Expected Output:
Alice Smith | 150.5
Alice Smith | 45

## Question 5: Join with Alias
Use aliases (`u` for Users, `o` for Orders) to select `u.name` and `o.status`.

> Type: code
> Language: sql
> Starting Code:
-- SELECT ... FROM Users u JOIN Orders o ...
> Verification Code:
SELECT u.name, o.status FROM Users u JOIN Orders o ON u.id = o.user_id;
> Expected Output:
Alice Smith | Completed
Alice Smith | Completed
Bob Jones | Pending
...

## Question 6: Cross Join
Perform a CROSS JOIN between `Users` and `Products`. This will create a row for every user/product combination.

> Type: code
> Language: sql
> Starting Code:
-- CROSS JOIN
> Verification Code:
SELECT * FROM Users CROSS JOIN Products;
> Expected Output:
(Many rows returned) 
