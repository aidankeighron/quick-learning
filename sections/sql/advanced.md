---
title: "Advanced SQL"
description: "Subqueries, CTEs, and Unions."
order: 4
difficulty: "Advanced"
---

## Question 1: Subquery Concept
What is a subquery?

- [ ] A query that substitutes another
- [x] A query nested inside another query
- [ ] A query that runs on a submarine
- [ ] A backup query

> Hint: Also known as an inner query.
> Explanation: A subquery is embedded within the WHERE or HAVING clause of another SQL query.

## Question 2: CTE Syntax
What does CTE stand for?

- [ ] Common Table Entry
- [x] Common Table Expression
- [ ] Complex Table Entity
- [ ] Computed Temporary Element

> Hint: Defined with the `WITH` keyword.
> Explanation: A CTE is a temporary result set that you can reference within another SELECT, INSERT, UPDATE, or DELETE statement.

## Question 3: Union Operator
Which operator is used to combine the result-set of two or more SELECT statements?

- [ ] JOIN
- [ ] MERGE
- [x] UNION
- [ ] COMBINE

> Hint: Stacks results vertically.
> Explanation: `UNION` combines results from multiple queries. `UNION ALL` includes duplicates.

## Question 4: Window Functions (Concept)
What distinguishes a Window Function from an Aggregate Function?

- [ ] Window functions work on windows OS
- [ ] Window functions collapse rows into one
- [x] Window functions perform calculations across a set of rows without grouping them
- [ ] No difference

> Hint: `OVER()` clause.
> Explanation: Window functions (like `RANK`, `ROW_NUMBER`) calculate values for each row based on a "window" of related rows, unlike `GROUP BY` which collapses rows.

## Question 5: Exists Operator
What does the `EXISTS` operator check for?

- [ ] If a table exists
- [x] If a subquery returns any records
- [ ] If a column is not null
- [ ] If a variable is defined

> Hint: Returns TRUE or FALSE.
> Explanation: `EXISTS` tests for the existence of any record in a subquery.

## Question 6: CTE Challenge
Use a CTE query to find the expensive products.
Define a CTE named `ExpensiveItems` that selects all columns from `Products` where `price` > 500. Then `SELECT * FROM ExpensiveItems`.

> Type: code
> Language: sql
> Expected Output: 
