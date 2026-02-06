# How to Create New Content Sections

The content for the Quick Learning platform is structured using a file-system based approach in the `sections/` directory.

## Directory Structure
To add a new subject (e.g., "JavaScript"), you need to create a new folder in `sections/`.

```
sections/
  ├── python/           <-- Section ID (URL path)
  │   ├── info.md       <-- REQUIRED: Section metadata
  │   ├── basics.md     <-- Topic ID (URL path)
  │   └── loops.md      <-- Another Topic
  └── javascript/       <-- New Section
      ├── info.md
      └── async.md
```

## Step 1: Create the Section Folder
Create a folder in `sections/` with a slug-friendly name (lowercase, no spaces).
- Example: `sections/web-development/`

## Step 2: Create `info.md`
Every section **must** have an `info.md` file. This defines the section's title and description shown on the home page.

**File:** `sections/web-development/info.md`
```markdown
---
title: "Web Development"
description: "Learn HTML, CSS, and modern web frameworks."
---
```

## Step 3: Create Topic Files
Create markdown files for each topic within the section. The filename becomes the URL path.
- File: `sections/web-development/html-basics.md`
- URL: `/quiz/web-development/html-basics`

### Frontmatter
Each topic file needs frontmatter including `difficulty` and `order`:
```markdown
---
title: "HTML Basics"
description: "Understand the structure of the web."
order: 1
difficulty: "Beginner" 
---
```
*Difficulty levels: "Beginner", "Intermediate", "Advanced".*

### Content Guidelines (60/40 Split)
We aim for a balance of practical coding experience and conceptual understanding.
- **Ratio:** ~60% Code Challenges, ~40% Multiple Choice.
- **Total Questions:** Target 10 questions per topic (6 Code, 4 MC).
- **Ordering:**
    - **Questions 1-2:** Introductory Multiple Choice (Conceptual).
    - **Questions 3+:** Mix of Code Challenges and intermediate MCs.
    - **Final Questions:** Advanced Code Challenges.

## Question Formats
Questions are defined using `## ` headers (e.g., `## Question 1: Title`).

### 1. Multiple Choice Question
Used for testing concepts.
```markdown
## Question 1: What is HTML?
What does HTML stand for?

> Type: multiple-choice
- [ ] Hyperlinks and Text Markup Language
- [x] Hyper Text Markup Language
- [ ] Home Tool Markup Language

> Hint: It's the standard markup language.
> Explanation: HTML stands for Hyper Text Markup Language.
```

### 2. Code Challenge (Python)
requires `Starting Code` for the user and `Verification Code` to check the answer.

**CRITICAL: Descriptive Error Messages**
When writing verification code, always use `assert` statements with **descriptive error messages**. The user will see this message if their code fails.

```markdown
## Question 3: Sum Function
Write a function `add(a, b)` that returns the sum of two numbers.

> Type: code
> Language: python
> Starting Code:
def add(a, b):
    # Your code here
    pass
> Verification Code:
# The user's code is executed first, so 'add' should be defined.
assert add(2, 3) == 5, f"Expected add(2, 3) to be 5, but got {add(2, 3)}"
assert add(10, -1) == 9, "Failed on negative numbers"
print("Correct!")
> Expected Output: Correct!
```
*Note: If the code executes successfully with no output, the system automtically shows "Code Executed Successfully".*

### 3. Code Challenge (SQL)
For SQL, the Verification Code is the **Correct Answer Query**. The system runs both the user's query and your verification query and compares the results.

```markdown
## Question 4: Select All Users
Select all columns from the `Users` table.

> Type: code
> Language: sql
> Starting Code:
-- Select all users
> Verification Code:
SELECT * FROM Users;
> Expected Output:
1 | Alice | ...
```
*(The Expected Output field for SQL is just for display/reference).*

## Summary of Syntax Blocks
- **Type**: `> Type: [code|multiple-choice]`
- **Language**: `> Language: [python|sql|javascript]`
- **Starting Code**: Code block shown to the user initially.
- **Verification Code**:
    *   *Python*: Hidden code that runs after user code. Use `assert`.
    *   *SQL*: Hidden correct query to compare results against.
- **Expected Output**: String shown to user as the target output.
