---
title: "Advanced SQL"
description: "Subqueries, CTEs, and Unions."
order: 4
difficulty: "Advanced"
---

## Question 1: Subquery Filtering
Find all products that have a price greater than the average price of all products. Use a subquery.

> Type: code
> Language: sql
> Starting Code:
-- Select products > avg price
> Verification Code:
SELECT * FROM Products WHERE price > (SELECT AVG(price) FROM Products);
> Expected Output:
1 | Laptop | ...
2 | Smartphone | ...

## Question 2: Simple CTE
Use a Common Table Expression (CTE) named `ExpensiveItems` to select products with price > 500. Then select everything from that CTE.

> Type: code
> Language: sql
> Starting Code:
WITH ExpensiveItems AS (
    -- Your query here
)
SELECT * FROM ExpensiveItems;
> Verification Code:
WITH ExpensiveItems AS (SELECT * FROM Products WHERE price > 500) SELECT * FROM ExpensiveItems;
> Expected Output:
1 | Laptop | ...
2 | Smartphone | ...

## Question 3: Union Operator
Create a list of all names from both `Users` and `Products`. Use `UNION` to combine the queries.

> Type: code
> Language: sql
> Starting Code:
-- Select name from Users ...
> Verification Code:
SELECT name FROM Users UNION SELECT name FROM Products;
> Expected Output:
Alice Smith
Bob Jones
...
Laptop
Smartphone
...

## Question 4: Exists Operator
Select the names of users who have placed at least one order. Use `EXISTS`.

> Type: code
> Language: sql
> Starting Code:
-- Select user names who have orders
> Verification Code:
SELECT name FROM Users WHERE EXISTS (SELECT 1 FROM Orders WHERE Orders.user_id = Users.id);
> Expected Output:
Alice Smith
Bob Jones
Charlie Brown
Evan Wright

## Question 5: Window Function (Rank)
Rank products by price (highest first) using `RANK() OVER (...)`.

> Type: code
> Language: sql
> Starting Code:
-- Rank products by price
> Verification Code:
SELECT name, price, RANK() OVER (ORDER BY price DESC) as rank FROM Products;
> Expected Output:
Laptop | 999.99 | 1
Smartphone | 699.99 | 2
...

## Question 6: Case Statement
Select the product name and a new column `CategoryPrice` that is 'High' if price > 500, else 'Low'.

> Type: code
> Language: sql
> Starting Code:
-- Select name, CASE ...
> Verification Code:
SELECT name, CASE WHEN price > 500 THEN 'High' ELSE 'Low' END as CategoryPrice FROM Products;
> Expected Output:
Laptop | High
Smartphone | High
Desk Chair | Low
... 
