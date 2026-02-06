import { getQuiz } from "@/lib/content";
import { QuizRunner } from "@/components/quiz-runner";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    sectionId: string;
    topicId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { sectionId, topicId } = await params;
   const quiz = getQuiz(sectionId, topicId);
   if (!quiz) return { title: 'Quiz Not Found' };
   return {
      title: `${quiz.title} | Quick Learning`,
      description: quiz.description
   };
}

export default async function QuizPage({ params }: Props) {
  const { sectionId, topicId } = await params;
  const quiz = getQuiz(sectionId, topicId);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background p-8 md:p-12 font-sans">
       <div className="max-w-4xl mx-auto mb-8">
           <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
             {quiz.title}
           </h1>
           <p className="text-muted-foreground">{quiz.description}</p>
       </div>
       <QuizRunner quiz={quiz} persistenceKey={`${sectionId}-${topicId}`} />
    </main>
  );
}
