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
      const { data: topicData } = matter(content);
      return {
        id: file.replace(".md", ""),
        title: topicData.title,
        description: topicData.description
      };
    });

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
    
    let currentMode: "description" | "options" | "hint" | "explanation" = "description";

    for (const line of remainingLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith("> Type: code")) {
        type = "code";
      } else if (trimmed.startsWith("> Language:")) {
        language = trimmed.replace(/^> Language:/, "").trim().toLowerCase() as any;
      } else if (trimmed.startsWith("> Expected Output:")) {
        expectedOutput = trimmed.replace(/^> Expected Output:/, "").trim();
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
        }
      }
    }

    questions.push({
      title: titleLine,
      description: description,
      type,
      language,
      expectedOutput: expectedOutput || undefined,
      options: options.length > 0 ? options : undefined,
      hint: hint || undefined,
      explanation: explanation || undefined
    });
  }

  return questions;
}
