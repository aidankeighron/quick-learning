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
  initialCode?: string;
  hiddenSuffixCode?: string;
  onOutput: (output: string) => void;
  className?: string;
};

export function CodeRunner({ language, initialCode, hiddenSuffixCode, onOutput, className }: CodeRunnerProps) {
  const [code, setCode] = useState(
    initialCode || (language === "javascript" 
      ? "console.log('Hello World');" 
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

    const codeToRun = code + (hiddenSuffixCode ? "\n" + hiddenSuffixCode : "");

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
          new Function(codeToRun)();
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
            
            await pyodide.runPythonAsync(codeToRun);
            // Result is accumulated in 'result' via stdout callback
        } catch (e: any) {
            throw e;
        }
      } else {
        try {
            const { loadPyodide } = await import("@/lib/pyodide");
            const pyodide = await loadPyodide();
            if (!pyodide) throw new Error("Failed to load Python environment.");

            // Load sqlite3 if not already loaded
            try {
               await pyodide.loadPackage("sqlite3");
            } catch (e) {
               console.warn("sqlite3 might already be loaded", e);
            }

            // Pass query securely via globals
            pyodide.globals.set("user_query", codeToRun);

            // Capture stdout
            pyodide.setStdout({ batched: (msg: string) => { result += msg + "\n"; } });

            const seedScript = `
import sqlite3

def run_sql():
    # Retrieve query from globals (user_query is injected via pyodide.globals.set)
    query = user_query
    
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

    try:
        cur.execute(query)
        
        if query.strip().upper().startswith("SELECT") or query.strip().upper().startswith("WITH"):
            if cur.description:
                col_names = [description[0] for description in cur.description]
                rows = cur.fetchall()
                
                # Formatted Output
                if not rows:
                    print("No results found.")
                else:
                    # Calculate column widths
                    widths = [len(str(c)) for c in col_names]
                    for row in rows:
                        for i, val in enumerate(row):
                            widths[i] = max(widths[i], len(str(val)))
                    
                    # Print Header
                    header = " | ".join(f"{str(col):<{w}}" for col, w in zip(col_names, widths))
                    print(header)
                    print("-" * len(header))
                    
                    # Print Rows
                    for row in rows:
                        print(" | ".join(f"{str(val):<{w}}" for val, w in zip(row, widths)))
            else:
                print("Query executed, but no results returned.")
                
        else:
             print(f"Query executed successfully.")
             if cur.rowcount > 0:
                 print(f"Rows affected: {cur.rowcount}")

    except Exception as e:
        print(f"SQL Error: {e}")
    finally:
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
