"use client";

import { useState, useEffect } from "react";
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
  persistenceKey: string;
};

export function QuizRunner({ quiz, persistenceKey }: QuizRunnerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState({ correct: 0, wrong: 0, skipped: 0 });
  const [history, setHistory] = useState<boolean[]>([]);
  const [codeOutput, setCodeOutput] = useState("");
  const [hasAttempted, setHasAttempted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from session storage
  useEffect(() => {
    const saved = sessionStorage.getItem(`quiz-state-${persistenceKey}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.version === 1) { // Simple versioning
            setCurrentQuestionIndex(parsed.currentQuestionIndex);
            setScore(parsed.score);
            setHistory(parsed.history);
            // We don't necessarily restore selectedOption or status to keep it clean, 
            // or we could. Let's start fresh on the saved question.
        }
      } catch (e) {
        console.error("Failed to load quiz state", e);
      }
    }
    setIsLoaded(true);
  }, [persistenceKey]);

  // Save to session storage
  useEffect(() => {
    if (!isLoaded) return;
    const state = {
        version: 1,
        currentQuestionIndex,
        score,
        history
    };
    sessionStorage.setItem(`quiz-state-${persistenceKey}`, JSON.stringify(state));
  }, [currentQuestionIndex, score, history, persistenceKey, isLoaded]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFinished = currentQuestionIndex >= quiz.questions.length;
  const isLocked = status === 'correct';

  const handleOptionSelect = (index: number) => {
    if (isLocked) return;
    setSelectedOptionIndex(index);
    setStatus('idle');
  };

  const onCodeOutputChange = (output: string) => {
    setCodeOutput(output);
    setStatus('idle');
  };

  const handleCheck = () => {
    let isCorrect = false;

    if (currentQuestion.type === "code") {
        if (!codeOutput) return;
        const expected = (currentQuestion.expectedOutput || "").trim();
        const actual = codeOutput.trim();
        // Simple exact match check, can be improved
        isCorrect = actual === expected;
    } else {
        if (selectedOptionIndex === null) return;
        isCorrect = currentQuestion.options![selectedOptionIndex].isCorrect;
    }

    if (isCorrect) {
        setStatus('correct');
        if (!hasAttempted) {
             setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
             setHistory(prev => [...prev, true]);
             setHasAttempted(true);
        }
    } else {
        setStatus('incorrect');
        if (!hasAttempted) {
             setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
             setHistory(prev => [...prev, false]);
             setHasAttempted(true);
        }
    }
  };

  const handleSkip = () => {
    setScore(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    setHistory(prev => [...prev, false]);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setCodeOutput("");
    setStatus('idle');
    setHasAttempted(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setStatus('idle');
    setCodeOutput("");
    setScore({ correct: 0, wrong: 0, skipped: 0 });
    setHistory([]);
    setHasAttempted(false);
    sessionStorage.removeItem(`quiz-state-${persistenceKey}`);
  };

  if (!isLoaded) {
      return <div className="p-8 text-center text-muted-foreground">Loading progress...</div>;
  }

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
              <Button onClick={() => sessionStorage.removeItem(`quiz-state-${persistenceKey}`)}>Back to Sections</Button>
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
                       key={currentQuestionIndex /* Force reset on question change */}
                       language={currentQuestion.language || "javascript"} 
                       initialCode={currentQuestion.startingCode}
                       hiddenSuffixCode={currentQuestion.verificationCode}
                       onOutput={onCodeOutputChange} 
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

                  // Show error if selected and incorrect status
                  if (status === 'incorrect' && isSelected) {
                      optionClass += " border-red-500 bg-red-500/10";
                  }
                  
                  // Show success if correct status
                  if (status === 'correct' && isSelected) {
                      optionClass += " border-green-500 bg-green-500/10";
                  }

                   // If correct, highlight the right one if not selected (optional, but good for review)
                  // For now, only if locked and this is the correct one:
                  if (isLocked && option.isCorrect && !isSelected) {
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
                         {status === 'correct' && isSelected && <CheckCircle2 className="text-green-500" />}
                         {status === 'incorrect' && isSelected && <XCircle className="text-red-500" />}
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
                disabled={isLocked}
                className="text-muted-foreground hover:text-foreground"
               >
                 Skip Question <SkipForward className="ml-2 h-4 w-4" />
               </Button>
              
               <div className="flex gap-2">
                 {/* Check Answer Button - Visible if not correct */}
                 {status !== 'correct' && (
                    <Button 
                      onClick={handleCheck} 
                      disabled={(currentQuestion.type === 'code' ? !codeOutput : selectedOptionIndex === null)}
                    >
                      Check Answer
                    </Button>
                 )}

                 {/* Next/Finish Logic */}
                 {/* If correct, show Next or Finish */}
                 {status === 'correct' && (
                     <Button onClick={isLastQuestion ? handleNextQuestion : handleNextQuestion}>
                        {isLastQuestion ? "Finish Quiz" : "Next Question"} <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                 )}

                 {/* Special Case for Last Question: Show Finish separately if we want to allow finishing without checking? 
                     User said: "on the last question there should be a seprate button to submit and to check your answer"
                     If I haven't checked yet, I see Check Answer.
                     Should I also see "Finish Quiz" (Submit)?
                     Maybe "Finish Quiz" submits whatever is there and ends? 
                     Let's add "Finish Quiz" button for Last Question if status is NOT correct, 
                     but maybe distinct from Check?
                  */}
                  {isLastQuestion && status !== 'correct' && (
                      <Button 
                        variant="secondary"
                        onClick={() => {
                             // If they click finish without checking, we might want to check for them or just end?
                             // Let's assume it checks + ends.
                             handleCheck();
                             // If we want to force end:
                             setTimeout(handleNextQuestion, 0); 
                             // Wait, this is risky if state update is async.
                             // Better: separate Finish logic.
                             // Actually user might mean: "Check" tells me if I'm right. "Finish" accepts my fate.
                        }}
                      >
                         Finish Quiz <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  )}
               </div>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence>
        {status !== 'idle' && (
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 10 }}
         >
           <Card className={cn(
             "border-l-4", 
             status === 'correct'
               ? "border-l-green-500 bg-green-500/5" 
               : "border-l-red-500 bg-red-500/5"
           )}>
             <CardContent className="p-6">
               <h4 className={cn(
                 "font-semibold mb-2 flex items-center",
                 status === 'correct' ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
               )}>
                 {status === 'correct' ? (
                   <><CheckCircle2 className="mr-2 h-5 w-5" /> Correct!</>
                 ) : (
                   <><XCircle className="mr-2 h-5 w-5" /> Incorrect</>
                 )}
               </h4>
               <p className="text-foreground/90 leading-relaxed">
                  {currentQuestion.type === "code" 
                     ? (status === 'correct' ? "Great job! Output matched." : `Expected: ${currentQuestion.expectedOutput}`)
                     : (status === 'correct'
                         ? currentQuestion.explanation 
                         : currentQuestion.hint || "Try again!") 
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
