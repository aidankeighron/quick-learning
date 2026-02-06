/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";

import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { Button } from "./ui/button";
import { Play, Loader2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { transform } from "sucrase";

type CodeRunnerProps = {
  language: "javascript" | "python" | "sql" | "typescript";
  initialCode?: string;
  hiddenSuffixCode?: string;
  onOutput: (output: string) => void;
  className?: string;
};



export function CodeRunner({ language, initialCode, hiddenSuffixCode, onOutput, className }: CodeRunnerProps) {
  const [code, setCode] = useState(
    initialCode || (language === "javascript" 
      ? "console.log('Hello World');" 
      : language === "typescript"
      ? "const msg: string = 'Hello World';\nconsole.log(msg);"
      : language === "python" 
      ? "print('Hello World')" 

      : "SELECT * FROM users;")
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
        // Expose logs for verification code
        (console as any)._logs = logs;
        Object.defineProperty(console, 'output', {
            get: () => logs.join("\n"),
            configurable: true
        });

        // Inject 'output' variable for synchronous checks
        const verificationPart = hiddenSuffixCode ? `
            // Snapshot output for synchronous checks
            var output = console.output; 
            ${hiddenSuffixCode}
        ` : "";
        
        const codeToRun = code + "\n" + verificationPart;

        try {
          // eslint-disable-next-line no-new-func
          new Function(codeToRun)();
        } catch (e: any) {
          throw e;
        } finally {
          console.log = originalLog;
          delete (console as any)._logs;
          // @ts-ignore
          delete console.output;
        }
        
        result = logs.join("\n");
      } else if (language === "typescript") {
        // TypeScript-specific validation: Ensure the code actually uses type annotations
        const hasTypeAnnotations = (
          /:[\s]*\w+/.test(code) ||  // Variable/param type annotations like `: number`
          /interface\s+\w+/.test(code) ||  // Interface definitions
          /type\s+\w+\s*=/.test(code) || // Type aliases
          /<\w+>/.test(code) ||  // Generics
          /as\s+\w+/.test(code)  // Type assertions
        );
        
        if (!hasTypeAnnotations && !code.includes("//skip-ts-check")) {
          setError(
            "⚠️ TypeScript Validation Failed: Your code doesn't use any type annotations!\n\n" +
            "TypeScript requires type annotations like:\n" +
            "  • const age: number = 25\n" +
            "  • function add(a: number, b: number): number { }\n" +
            "  • interface User { id: number }\n\n" +
            "Plain JavaScript won't pass TypeScript challenges."
          );
          return;
        }
        
        const fullCode = code + (hiddenSuffixCode ? "\n" + hiddenSuffixCode : "");
        const ts = await import("typescript");
        let jsCode: string;
        
        try {
          jsCode = ts.transpile(fullCode, {
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS
          });
        } catch (err: any) {
          setError(`TypeScript Compilation Error: ${err.message}`);
          return;
        }

        // Capture console
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          logs.push(args.map(String).join(" "));
        };

        try {
          const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
          const fn = new AsyncFunction(jsCode);
          await fn();
        } catch (e: any) {
          console.log = originalLog;
          setError(e.message || "Runtime Error");
          return;
        } finally {
          console.log = originalLog;
        }

        result = logs.join("\n");
      } else if (language === "python") {
        const codeToRun = code + (hiddenSuffixCode ? "\n" + hiddenSuffixCode : "");
        try {
            const { loadPyodide } = await import("@/lib/pyodide");
            const pyodide = await loadPyodide();
            if (!pyodide) throw new Error("Failed to load Python environment.");

            // Capture stdout
            pyodide.setStdout({ batched: (msg: string) => { result += msg + "\n"; } });
            
            // Pass code string safely
            pyodide.globals.set("full_code_to_run", codeToRun);

            // Execute via a wrapper script to catch assertions
            const wrapperScript = `
import traceback
try:
    # Execute in the global namespace to allow function definitions to persist/be usable if needed
    # matching standard "script" behavior.
    exec(full_code_to_run, globals())
except AssertionError as e:
    msg = str(e)
    if not msg:
        msg = "Assertion failed"
    print(f"[TEST FAILED] {msg}")
except Exception:
    # Print full traceback for other errors
    traceback.print_exc()
`;
            await pyodide.runPythonAsync(wrapperScript);

            if (!result.trim()) {
                result = "[Code Executed Successfully]";
            }
        } catch (e: any) {
            // This catch handles Pyodide loading errors or fatal crashes in runPythonAsync
            // The python-side try/except handles the user code errors.
            throw e;
        }
      } else {
        // SQL...
        try {
            const { loadPyodide } = await import("@/lib/pyodide");
            const pyodide = await loadPyodide();
            if (!pyodide) throw new Error("Failed to load Python environment.");

            // Load sqlite3
            try {
               await pyodide.loadPackage("sqlite3");
            } catch (e) {
               // ignore if loaded
            }

            // Pass queries via globals
            pyodide.globals.set("user_query", code);
            pyodide.globals.set("answer_query", hiddenSuffixCode || "");

            // Capture stdout
            pyodide.setStdout({ batched: (msg: string) => { result += msg + "\n"; } });

            const seedScript = `
import sqlite3
import js

def run_sql():
    user_query = user_query # from globals
    answer_query = answer_query # from globals
    
    con = sqlite3.connect(":memory:")
    cur = con.cursor()
    
    # Seed Data
    cur.executescript("""
    CREATE TABLE Users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, country TEXT, join_date TEXT);
    INSERT INTO Users VALUES (1, 'Alice Smith', 'alice@example.com', 'USA', '2023-01-15');
    INSERT INTO Users VALUES (2, 'Bob Jones', 'bob@example.com', 'UK', '2023-02-20');
    INSERT INTO Users VALUES (3, 'Charlie Brown', 'charlie@example.com', 'Canada', '2023-03-10');
    INSERT INTO Users VALUES (4, 'Diana Prince', 'diana@example.com', 'USA', '2023-01-05');
    INSERT INTO Users VALUES (5, 'Evan Wright', 'evan@example.com', 'Australia', '2023-04-12');

    CREATE TABLE Orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount DECIMAL(10, 2), status TEXT, order_date TEXT);
    INSERT INTO Orders VALUES (101, 1, 150.50, 'Completed', '2023-05-01');
    INSERT INTO Orders VALUES (102, 2, 89.99, 'Pending', '2023-05-03');
    INSERT INTO Orders VALUES (103, 1, 45.00, 'Completed', '2023-05-05');
    INSERT INTO Orders VALUES (104, 3, 200.00, 'Shipped', '2023-05-06');
    INSERT INTO Orders VALUES (105, 5, 35.00, 'Cancelled', '2023-05-07');

    CREATE TABLE Products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price DECIMAL(10, 2), stock INTEGER);
    INSERT INTO Products VALUES (1, 'Laptop', 'Electronics', 999.99, 10);
    INSERT INTO Products VALUES (2, 'Smartphone', 'Electronics', 699.99, 20);
    INSERT INTO Products VALUES (3, 'Desk Chair', 'Furniture', 149.99, 15);
    INSERT INTO Products VALUES (4, 'Coffee Table', 'Furniture', 89.99, 5);
    INSERT INTO Products VALUES (5, 'Headphones', 'Electronics', 199.99, 30);
    """)

    # 1. Run User Query
    user_rows = []
    user_cols = []
    
    try:
        cur.execute(user_query)
        if cur.description:
            user_cols = [d[0] for d in cur.description]
            user_rows = cur.fetchall()
            
            # Print User Output
            if not user_rows:
                print("No results found.")
            else:
                 widths = [len(str(c)) for c in user_cols]
                 for row in user_rows:
                     for i, val in enumerate(row):
                         widths[i] = max(widths[i], len(str(val)))
                 header = " | ".join(f"{str(col):<{w}}" for col, w in zip(user_cols, widths))
                 print(header)
                 print("-" * len(header))
                 for row in user_rows:
                     print(" | ".join(f"{str(val):<{w}}" for val, w in zip(row, widths)))
        else:
             print("Query executed.")
             if cur.rowcount > 0:
                 print(f"Rows affected: {cur.rowcount}")

    except Exception as e:
        print(f"SQL Error: {e}")
        return

    # 2. Run Answer Query (if provided)
    if not answer_query:
        # If no answer provided, just success (sandbox mode)
        return

    ans_rows = []
    ans_cols = []
    
    try:
        cur_ans = con.cursor()
        cur_ans.execute(answer_query)
        if cur_ans.description:
            ans_cols = [d[0] for d in cur_ans.description]
            ans_rows = cur_ans.fetchall()
    except Exception as e:
        print(f"Reference Error: {e}")
        return

    # 3. Compare Results
    # A. Check Column Count
    if len(user_cols) != len(ans_cols):
        print(f"[ERROR] Wrong number of columns. Expected {len(ans_cols)}, got {len(user_cols)}.")
        return

    # B. Check Row Count
    if len(user_rows) != len(ans_rows):
        print(f"[ERROR] Wrong number of rows. Expected {len(ans_rows)} rows, got {len(user_rows)}.")
        return

    # C. Check Data 
    # Determine if order matters
    check_order = "ORDER BY" in answer_query.upper()
    
    matched = False
    
    if check_order:
        if user_rows == ans_rows:
            matched = True
        else:
            print("[ERROR] Data mismatch or wrong order. Ensure you sort correctly.")
    else:
        # Sort both by all columns for set comparison
        if sorted(user_rows) == sorted(ans_rows):
            matched = True
        else:
            print("[ERROR] Data mismatch. The returned records do not match expected results.")
            
    if matched:
        print("[SUCCESS]")

    con.close()

run_sql()
`;
            
            await pyodide.runPythonAsync(seedScript);
        } catch (e: any) {
            throw e;
        }
      }

      setOutput(result);
      onOutput(result);
    } catch (err: any) {
      setError(err.message);
      onOutput(""); 
    } finally {
      setIsLoading(false);
    }
  }, [code, language, hiddenSuffixCode, onOutput]);

  return (
    <div className={cn("border rounded-md overflow-hidden bg-[#1d1f21]", className)}>
      <div className="flex justify-between items-center bg-[#25282c] p-2 border-b border-border/20">
         <span className="text-xs text-muted-foreground uppercase font-mono ml-2">{language}</span>
         <div className="flex items-center gap-2">
             <Button size="sm" onClick={runCode} disabled={isLoading} className="h-7 text-xs">
               {isLoading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Play className="mr-1 h-3 w-3" />}
               {isLoading ? "Running..." : "Run"}
             </Button>
         </div>
      </div>
      <div className="max-h-[300px] overflow-auto font-mono text-sm relative min-h-[150px]">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages[language === "sql" ? "sql" : language === "python" ? "python" : language === "typescript" ? "typescript" : "javascript"] || languages.js, language)}
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
