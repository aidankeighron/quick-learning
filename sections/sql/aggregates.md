---
title: "Aggregates"
description: "Summarizing data with GROUP BY, COUNT, SUM."
order: 3
difficulty: "Intermediate"
---

## Question 1: Counting Rows
Which function counts the number of rows?

- [ ] MAX()
- [ ] SUM()
- [x] COUNT()
- [ ] TOTAL()

> Hint: Counts items.
> Explanation: `COUNT(*)` counts all rows; `COUNT(column)` counts non-null values.

## Question 2: Grouping Data
Which clause groups rows that have the same values into summary rows?

- [ ] ORDER BY
- [ ] FILTER BY
- [x] GROUP BY
- [ ] CONNECT BY

> Hint: Used with aggregate functions.
> Explanation: `GROUP BY` aggregates data across categories.

## Question 3: Filtering Groups
Which clause is used to filter groups *after* aggregation?

- [ ] WHERE
- [x] HAVING
- [ ] LIKE
- [ ] GROUP FILTER

> Hint: `WHERE` filters rows; this filters groups.
> Explanation: `HAVING` must be used instead of `WHERE` when filtering based on aggregate functions.

## Question 4: Distinct Values
How do you count only the *unique* values in a column?

- [ ] COUNT(UNIQUE col)
- [x] COUNT(DISTINCT col)
- [ ] COUNT(ONLY col)
- [ ] UNIQUE(col)

> Hint: The keyword for uniqueness.
> Explanation: `DISTINCT` eliminates duplicates before counting.

## Question 5: Summation
Which function calculates the total sum of a numeric column?

- [ ] ADD()
- [ ] TOTAL()
- [x] SUM()
- [ ] COUNT()

> Hint: Adds up values.
> Explanation: `SUM()` adds all values in the column.

## Question 6: Aggregating Orders
Count the number of orders for each user.
Select `user_id` and the count of orders (aliased as `order_count`) from `Orders` table, grouped by `user_id`.

> Type: code
> Language: sql
> Expected Output: 
