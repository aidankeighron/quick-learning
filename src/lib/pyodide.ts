"use client";

declare global {
  interface Window {
    loadPyodide: any;
  }
}

let pyodidePromise: Promise<any> | null = null;

export const loadPyodide = async () => {
  if (pyodidePromise) return pyodidePromise;

  if (typeof window === "undefined") return null;

  pyodidePromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      // Script already loaded by another component or preloaded
      window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
      }).then(resolve).catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
    script.onload = async () => {
      try {
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });
        resolve(pyodide);
      } catch (e) {
        reject(e);
      }
    };
    script.onerror = (e) => reject(new Error("Failed to load Pyodide script: " + e));
    document.body.appendChild(script);
  });
  
  return pyodidePromise;
};
