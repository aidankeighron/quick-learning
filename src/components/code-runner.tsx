"use client";

import { useState, useCallback } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { Button } from "./ui/button";
import { Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeRunnerProps = {
  language: "javascript" | "python" | "sql";
  onOutput: (output: string) => void;
  className?: string;
};

export function CodeRunner({ language, onOutput, className }: CodeRunnerProps) {
  const [code, setCode] = useState(
    language === "javascript" 
      ? "console.log('Hello World');" 
      : language === "python" 
      ? "print('Hello World')" 
      : "SELECT * FROM users;"
  );
  
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const runCode = useCallback(async () => {
    setOutput("");
    setError("");
    setIsLoading(true);
    let result = "";

    try {
      if (language === "javascript") {
        // Capture console.log
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(a => String(a)).join(" "));
        };

        try {
          // eslint-disable-next-line no-new-func
          new Function(code)();
        } catch (e: any) {
          throw e;
        } finally {
          console.log = originalLog;
        }
        
        result = logs.join("\n");
      } else if (language === "python") {
        try {
            const { loadPyodide } = await import("@/lib/pyodide");
            const pyodide = await loadPyodide();
            if (!pyodide) throw new Error("Failed to load Python environment.");

            // Capture stdout
            pyodide.setStdout({ batched: (msg: string) => { result += msg + "\n"; } });
            
            await pyodide.runPythonAsync(code);
            // Result is accumulated in 'result' via stdout callback
        } catch (e: any) {
            throw e;
        }
      } else {
        // Simulation for SQL (placeholder)
        result = "Simulation: Execution successful.\n(Real execution requires SQL.js which is not yet integrated)\n";
      }

      setOutput(result);
      onOutput(result);
    } catch (err: any) {
      setError(err.message);
      onOutput(""); // Clear output on error? Or keep partial?
    } finally {
      setIsLoading(false);
    }
  }, [code, language, onOutput]);

  return (
    <div className={cn("border rounded-md overflow-hidden bg-[#1d1f21]", className)}>
      <div className="flex justify-between items-center bg-[#25282c] p-2 border-b border-border/20">
         <span className="text-xs text-muted-foreground uppercase font-mono ml-2">{language}</span>
         <Button size="sm" onClick={runCode} disabled={isLoading} className="h-7 text-xs">
           {isLoading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Play className="mr-1 h-3 w-3" />}
           {isLoading ? "Running..." : "Run"}
         </Button>
      </div>
      <div className="max-h-[300px] overflow-auto font-mono text-sm relative">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages[language === "sql" ? "sql" : language === "python" ? "python" : "javascript"] || languages.js, language)}
          padding={16}
          className="font-mono text-[14px] min-h-[100px]"
          textareaClassName="focus:outline-none"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "#1d1f21",
            color: "#c5c8c6"
          }}
        />
      </div>
      {(output || error) && (
        <div className="border-t border-border/20 p-4 bg-black/40 font-mono text-sm">
           <div className="text-xs text-muted-foreground mb-1">Output:</div>
           {error ? (
             <div className="text-red-400 whitespace-pre-wrap">{error}</div>
           ) : (
             <div className="text-green-400 whitespace-pre-wrap">{output}</div>
           )}
        </div>
      )}
    </div>
  );
}
