import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SECTIONS_DIR = path.join(process.cwd(), "sections");

export type Section = {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionCount: number;
};

export type Quiz = {
  title: string;
  description: string;
  questions: Question[];
};

export type Question = {
  title: string;
  description: string;
  type: "multiple-choice" | "code";
  language?: "javascript" | "python" | "sql";
  options?: Option[]; // For multiple-choice
  expectedOutput?: string; // For code
  verificationCode?: string; // For code verification
  startingCode?: string; // Initial code in editor
  hint?: string;
  explanation?: string;
};

export type Option = {
  text: string;
  isCorrect: boolean;
};

export function getSections(): Section[] {
  if (!fs.existsSync(SECTIONS_DIR)) return [];

  const sectionFolders = fs.readdirSync(SECTIONS_DIR);
  
  const sections = sectionFolders.map((folder) => {
    const sectionPath = path.join(SECTIONS_DIR, folder);
    const infoPath = path.join(sectionPath, "info.md");
    
    if (!fs.existsSync(infoPath)) return null;
    
    const fileContent = fs.readFileSync(infoPath, "utf-8");
    const { data } = matter(fileContent);
    
    // Get topics
    const topicFiles = fs.readdirSync(sectionPath).filter(f => f.endsWith(".md") && f !== "info.md");
    const topics = topicFiles.map(file => {
      const content = fs.readFileSync(path.join(sectionPath, file), "utf-8");
      const { data: topicData, content: markdownContent } = matter(content);
      
      // Calculate question count (approximate by counting H2 headers)
      const questionCount = (markdownContent.match(/^## /gm) || []).length;

      return {
        id: file.replace(".md", ""),
        title: topicData.title,
        description: topicData.description,
        order: topicData.order || 999,
        difficulty: topicData.difficulty || "Beginner",
        questionCount
      };
    }).sort((a, b) => a.order - b.order);

    return {
      id: folder,
      title: data.title,
      description: data.description,
      topics
    };
  }).filter(Boolean) as Section[];

  return sections;
}

export function getQuiz(sectionId: string, topicId: string): Quiz | null {
  const filePath = path.join(SECTIONS_DIR, sectionId, `${topicId}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const questions = parseQuizContent(content);

  return {
    title: data.title,
    description: data.description,
    questions
  };
}


function parseQuizContent(content: string): Question[] {
  const questions: Question[] = [];
  const questionBlocks = content.split(/^## /m).slice(1);

  for (const block of questionBlocks) {
    const lines = block.split("\n");
    const titleLine = lines[0].trim();
    const remainingLines = lines.slice(1);
    
    let description = "";
    const options: Option[] = [];
    let hint = "";
    let explanation = "";
    let type: "multiple-choice" | "code" = "multiple-choice";
    let language: "javascript" | "python" | "sql" | undefined;
    let expectedOutput = "";
    let verificationCode = "";
    let startingCode = "";
    
    let currentMode: "description" | "options" | "hint" | "explanation" | "verificationCode" | "startingCode" = "description";

    for (const line of remainingLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("> Type: code")) {
        type = "code";
      } else if (trimmed.startsWith("> Language:")) {
        language = trimmed.replace(/^> Language:/, "").trim().toLowerCase() as any;
      } else if (trimmed.startsWith("> Expected Output:")) {
        expectedOutput = trimmed.replace(/^> Expected Output:/, "").trim();
      } else if (trimmed.startsWith("> Verification Code:")) {
        // We need to capture potentially multi-line verification code
        // But the current parser is line-based. 
        // Let's assume verification code is a single line or we switch mode.
        // Actually, let's switch mode for robustness if it gets complex.
        // For now, let's treat it like Hint/Explanation if it's multi-line?
        // OR simply: > Verification Code: assert sum([1,2]) == 3
        // Let's support multi-line by adding a mode.
        currentMode = "verificationCode";
      } else if (trimmed.startsWith("> Starting Code:")) {
         currentMode = "startingCode";
      } else if (trimmed.startsWith("- [")) {
        currentMode = "options";
        const isCorrect = trimmed.startsWith("- [x]");
        const text = trimmed.replace(/^- \[[x ]\] /, "").trim();
        options.push({ text, isCorrect });
      } else if (trimmed.startsWith("> Hint:")) {
        currentMode = "hint";
        hint = trimmed.replace(/^> Hint:/, "").trim();
      } else if (trimmed.startsWith("> Explanation:")) {
        currentMode = "explanation";
        explanation = trimmed.replace(/^> Explanation:/, "").trim();
      } else {
        if (currentMode === "description") {
          description += (description ? "\n" : "") + trimmed;
        } else if (currentMode === "hint") {
           hint += " " + trimmed;
        } else if (currentMode === "explanation") {
           explanation += " " + trimmed;
        } else if (currentMode === "verificationCode") {
           // Verification code typically needs newlines preserved
           // But `trimmed` removes leading whitespace which might break indentation of python code.
           // We should probably use `line` instead of `trimmed` for code blocks.
           // However, the block splitting logic trims the block lines initially?
           // No, `block.split("\n")` preserves lines.
           // But we are iterating `remainingLines`.
           // `line` preserves indentation relative to the file, but we might have indentation from block quote?
           // The user format is `> Verification Code:`
           // If follows standard markdown, maybe we shouldn't trim heavily.
           // For now let's just append with newline.
           verificationCode += (verificationCode ? "\n" : "") + line.replace(/^> /, ""); 
        } else if (currentMode === "startingCode") {
           startingCode += (startingCode ? "\n" : "") + line.replace(/^> /, "");
        }
      }
    }

    questions.push({
      title: titleLine,
      description: description,
      type,
      language,
      expectedOutput: expectedOutput || undefined,
      verificationCode: verificationCode || undefined,
      startingCode: startingCode || undefined,
      options: options.length > 0 ? options : undefined,
      hint: hint || undefined,
      explanation: explanation || undefined
    });
  }

  return questions;
}
