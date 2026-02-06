# Quick Learning

An interactive learning platform designed to let you easily create quizes with AI to reinforce your knowledge on topics.

## Features

- **Interactive Quizzes**: Multiple-choice questions with instant feedback.
- **Code Challenges**: Run Python and JavaScript code directly in the browser (powered by Pyodide).
- **Markdown Driven**: Content is easily managed via markdown files in the `sections/` directory.
- **Progress Tracking**: Local storage based progress tracking.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly experience.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js 18+ installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aidankeighron/quick-learning
   cd quick-learning
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to start learning.

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable React components (UI, Code Runner, Quiz Runner).
- `src/lib`: Utility functions and content parsing logic.
- `sections/`: **The Content Source**. This directory holds all the quizzes and topics.

## Contributing

We welcome contributions. Or if there is a specific topic you want to see added, feel free to open an issue.

### Adding New Content
Want to add a new course or topic? It's as easy as adding a markdown file!
**[Read the Content Creation Guide](./HOW_TO_ADD_SECTIONS.md)** on how to structure your files and questions.

### Code Contributions
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.
