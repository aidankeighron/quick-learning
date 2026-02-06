---
title: "Aggregates"
description: "Summarizing data with GROUP BY, COUNT, SUM."
order: 3
difficulty: "Intermediate"
---

## Question 1: Basic Count
Count the total number of rows in the `Products` table.

> Type: code
> Language: sql
> Starting Code:
-- Count products
> Verification Code:
SELECT COUNT(*) FROM Products;
> Expected Output:
5

## Question 2: Summing Values
Calculate the total revenue (sum of `amount`) from the `Orders` table.

> Type: code
> Language: sql
> Starting Code:
-- Sum of order amounts
> Verification Code:
SELECT SUM(amount) FROM Orders;
> Expected Output:
520.49

## Question 3: Average Value
Find the average price of all products.

> Type: code
> Language: sql
> Starting Code:
-- Average product price
> Verification Code:
SELECT AVG(price) FROM Products;
> Expected Output:
(Calculated Average)

## Question 4: Max and Min
Find the price of the most expensive product.

> Type: code
> Language: sql
> Starting Code:
-- Max price
> Verification Code:
SELECT MAX(price) FROM Products;
> Expected Output:
999.99

## Question 5: Group By
Count the number of orders placed by each `user_id`. Select `user_id` and the count.

> Type: code
> Language: sql
> Starting Code:
-- Count orders per user
> Verification Code:
SELECT user_id, COUNT(*) FROM Orders GROUP BY user_id;
> Expected Output:
1 | 2
2 | 1
3 | 1
5 | 1

## Question 6: Having Clause
Find `user_id`s that have placed more than 1 order. Use `GROUP BY` and `HAVING`.

> Type: code
> Language: sql
> Starting Code:
-- Users with > 1 order
> Verification Code:
SELECT user_id FROM Orders GROUP BY user_id HAVING COUNT(*) > 1;
> Expected Output:
1 
