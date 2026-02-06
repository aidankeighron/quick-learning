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
Each topic file needs frontmatter:
```markdown
---
title: "HTML Basics"
description: "Understand the structure of the web."
---
```

### Questions Format
Questions are defined using `## ` headers.

#### Multiple Choice Question
```markdown
## Question 1: What is HTML?
What does HTML stand for?

- [ ] Hyperlinks and Text Markup Language
- [x] Hyper Text Markup Language
- [ ] Home Tool Markup Language

> Hint: It's the standard markup language for documents designed to be displayed in a web browser.
> Explanation: HTML stands for Hyper Text Markup Language.
```

#### Code Challenge Question
For coding challenges, use specific blockquotes to define expectations.
Supported languages: `python`, `javascript`, `sql`.

```markdown
## Question 2: Hello World
Write a JavaScript code to log "Hello World" to the console.

> Type: code
> Language: javascript
> Expected Output: Hello World
```

## Summary of Syntax
- **Options**: `- [ ]` for incorrect, `- [x]` for correct.
- **Hints**: `> Hint: Your hint here`
- **Explanations**: `> Explanation: Your details here`
- **Code Type**: `> Type: code`
- **Code Language**: `> Language: [language]`
- **Expected Output**: `> Expected Output: [string]`
