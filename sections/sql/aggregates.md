---
title: "Aggregates"
description: "Summarizing data with GROUP BY, COUNT, SUM."
order: 3
difficulty: "Intermediate"
---

## Question 1: Aggregate Definition
What is an aggregate function?

> Type: multiple-choice
- [ ] A function that operates on a single row
- [x] A function that performs a calculation on a set of values and returns a single value
- [ ] A function that joins tables
- [ ] A function that sorts data

## Question 2: NULL Values
How does `COUNT(column_name)` handle NULL values?

> Type: multiple-choice
- [ ] It includes them
- [x] It ignores them
- [ ] It returns 0
- [ ] It throws an error

## Question 3: Basic Count
Count the total number of rows in the `Products` table.

> Type: code
> Language: sql
> Starting Code:
-- Count products
> Verification Code:
SELECT COUNT(*) FROM Products;
> Expected Output:
5

## Question 4: Summing Values
Calculate the total revenue (sum of `amount`) from the `Orders` table.

> Type: code
> Language: sql
> Starting Code:
-- Sum of order amounts
> Verification Code:
SELECT SUM(amount) FROM Orders;
> Expected Output:
520.49

## Question 5: Group By Usage
Which clause is mandatory when using non-aggregated columns with aggregate functions?

> Type: multiple-choice
- [ ] ORDER BY
- [ ] WHERE
- [x] GROUP BY
- [ ] HAVING

## Question 6: Filtering Aggregates
Which clause must be used to filter the *results* of an aggregate function (e.g., count > 5)?

> Type: multiple-choice
- [ ] WHERE
- [x] HAVING
- [ ] FILTER
- [ ] LIMIT

## Question 7: Average Value
Find the average price of all products.

> Type: code
> Language: sql
> Starting Code:
-- Average product price
> Verification Code:
SELECT AVG(price) FROM Products;
> Expected Output:
(Calculated Average)

## Question 8: Max and Min
Find the price of the most expensive product.

> Type: code
> Language: sql
> Starting Code:
-- Max price
> Verification Code:
SELECT MAX(price) FROM Products;
> Expected Output:
999.99

## Question 9: Group By
Count the number of orders placed by each `user_id`. Select `user_id` and the count.

> Type: code
> Language: sql
> Starting Code:
-- Count orders per user
> Verification Code:
SELECT user_id, COUNT(*) FROM Orders GROUP BY user_id;
> Expected Output:
1 | 2
2 | 1 ...

## Question 10: Having Clause
Find `user_id`s that have placed more than 1 order. Use `GROUP BY` and `HAVING`.

> Type: code
> Language: sql
> Starting Code:
-- Users with > 1 order
> Verification Code:
SELECT user_id FROM Orders GROUP BY user_id HAVING COUNT(*) > 1;
> Expected Output:
1
