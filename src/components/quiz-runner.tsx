"use client";

import { useState } from "react";
import { type Quiz } from "@/lib/content";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RefreshCw, ArrowRight, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CodeRunner } from "./code-runner";

type QuizRunnerProps = {
  quiz: Quiz;
};

export function QuizRunner({ quiz }: QuizRunnerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0, skipped: 0 });
  const [history, setHistory] = useState<boolean[]>([]);
  const [codeOutput, setCodeOutput] = useState("");
  const [isCorrectState, setIsCorrectState] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFinished = currentQuestionIndex >= quiz.questions.length;

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (currentQuestion.type === "code") {
        if (!codeOutput) return;
        const expected = (currentQuestion.expectedOutput || "").trim();
        const actual = codeOutput.trim();
        
        // Simple exact match check for now, can be improved
        const isCorrect = actual === expected || (expected === "Hello" && actual.includes("Hello"));

        setIsSubmitted(true);
        setIsCorrectState(isCorrect);
        
        if (isCorrect) {
          setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
          setHistory(prev => [...prev, true]);
        } else {
          setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
          setHistory(prev => [...prev, false]);
        }
    } else {
        if (selectedOptionIndex === null) return;
        setIsSubmitted(true);
        const isCorrect = currentQuestion.options![selectedOptionIndex].isCorrect;
        setIsCorrectState(isCorrect);
        
        if (isCorrect) {
            setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
            setHistory(prev => [...prev, true]);
        } else {
            setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
            setHistory(prev => [...prev, false]);
        }
    }
  };

  const handleSkip = () => {
    setScore(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    setHistory(prev => [...prev, false]);
    handleNext();
  };

  const handleNext = () => {
    setSelectedOptionIndex(null);
    setCodeOutput("");
    setIsSubmitted(false);
    setIsCorrectState(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setCodeOutput("");
    setIsCorrectState(false);
    setScore({ correct: 0, wrong: 0, skipped: 0 });
    setHistory([]);
  };

  if (isFinished) {
    const accuracy = Math.round((score.correct / quiz.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="text-center p-8 bg-card border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Quiz Complete!</CardTitle>
            <CardDescription className="text-xl">You scored {accuracy}%</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
             <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                <div className="text-2xl font-bold">{score.correct}</div>
                <div className="text-sm">Correct</div>
             </div>
             <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                <div className="text-2xl font-bold">{score.wrong}</div>
                <div className="text-sm">Wrong</div>
             </div>
             <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                <div className="text-2xl font-bold">{score.skipped}</div>
                <div className="text-sm">Skipped</div>
             </div>
          </CardContent>
          <CardFooter className="justify-center gap-4">
            <Button onClick={handleRestart} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Restart Quiz
            </Button>
            <Link href="/">
              <Button>Back to Sections</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% completed</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{currentQuestion.title}</CardTitle>
              <CardDescription className="text-base md:text-lg mt-2 text-foreground/80">
                {currentQuestion.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuestion.type === "code" ? (
                 <div className="space-y-4">
                    <CodeRunner 
                       language={currentQuestion.language || "javascript"} 
                       onOutput={setCodeOutput} 
                    />
                 </div>
              ) : (
                currentQuestion.options?.map((option, index) => {
                  const isSelected = selectedOptionIndex === index;
                  let optionClass = "border-2 p-4 rounded-xl cursor-pointer transition-all hover:bg-accent/5";
                  
                  if (isSelected) {
                     optionClass += " border-primary bg-primary/5 ring-2 ring-primary/20";
                  } else {
                     optionClass += " border-muted";
                  }

                  if (isSubmitted && isSelected) {
                      if (option.isCorrect) {
                          optionClass += " border-green-500 bg-green-500/10";
                      } else {
                          optionClass += " border-red-500 bg-red-500/10";
                      }
                  }
                  
                  if (isSubmitted && option.isCorrect && !isSelected) {
                       optionClass += " border-green-500 border-dashed opacity-70";
                  }

                  return (
                    <div 
                      key={index} 
                      className={optionClass}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <div className="flex items-center justify-between">
                         <span className="font-medium">{option.text}</span>
                         {isSubmitted && isSelected && option.isCorrect && <CheckCircle2 className="text-green-500" />}
                         {isSubmitted && isSelected && !option.isCorrect && <XCircle className="text-red-500" />}
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center bg-muted/50 p-6 rounded-b-xl border-t">
               <Button 
                variant="ghost" 
                onClick={handleSkip}
                disabled={isSubmitted}
                className="text-muted-foreground hover:text-foreground"
               >
                 Skip Question <SkipForward className="ml-2 h-4 w-4" />
               </Button>

               {!isSubmitted ? (
                 <Button onClick={handleSubmit} disabled={(currentQuestion.type === 'code' ? !codeOutput : selectedOptionIndex === null)}>
                   Submit Answer
                 </Button>
               ) : (
                 <Button onClick={handleNext}>
                   {isLastQuestion ? "Finish Quiz" : "Next Question"} <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
               )}
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence>
        {isSubmitted && (
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 10 }}
         >
           <Card className={cn(
             "border-l-4", 
             isCorrectState
               ? "border-l-green-500 bg-green-500/5" 
               : "border-l-red-500 bg-red-500/5"
           )}>
             <CardContent className="p-6">
               <h4 className={cn(
                 "font-semibold mb-2 flex items-center",
                 isCorrectState ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
               )}>
                 {isCorrectState ? (
                   <><CheckCircle2 className="mr-2 h-5 w-5" /> Correct!</>
                 ) : (
                   <><XCircle className="mr-2 h-5 w-5" /> Incorrect</>
                 )}
               </h4>
               <p className="text-foreground/90 leading-relaxed">
                  {currentQuestion.type === "code" 
                     ? (isCorrectState ? "Great job! Output matched." : `Expected: ${currentQuestion.expectedOutput}`)
                     : (isCorrectState 
                         ? currentQuestion.explanation 
                         : currentQuestion.hint || "Try again!") // For multiple choice
                   }
               </p>
             </CardContent>
           </Card>
         </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
