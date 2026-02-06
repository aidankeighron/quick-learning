import { getSections } from "@/lib/content";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Code2, Database, FileJson, Terminal, Coffee, Cog } from "lucide-react";

// Icon mapping for sections
const sectionIcons: Record<string, any> = {
  python: Code2,
  sql: Database,
  javascript: FileJson,
  typescript: Terminal,
  java: Coffee,
  cpp: Cog,
};

// Color schemes for sections
const sectionColors: Record<string, string> = {
  python: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/50",
  sql: "from-orange-500/20 to-amber-500/20 border-orange-500/30 hover:border-orange-500/50",
  javascript: "from-yellow-500/20 to-yellow-400/20 border-yellow-500/30 hover:border-yellow-500/50",
  typescript: "from-blue-600/20 to-blue-500/20 border-blue-600/30 hover:border-blue-600/50",
  java: "from-red-600/20 to-orange-600/20 border-red-600/30 hover:border-red-600/50",
  cpp: "from-purple-600/20 to-pink-600/20 border-purple-600/30 hover:border-purple-600/50",
};

export default function Home() {
  const sections = getSections().filter(section => 
    section.id !== 'java' && section.id !== 'cpp'
  );

  return (
    <main className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-5xl mx-auto px-8 py-16 md:py-24 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
            Quick Learning Practice
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Master programming concepts efficiently with interactive quizzes and hands-on coding challenges.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link 
              href="/topics"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Browse All Topics
            </Link>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="max-w-6xl mx-auto px-8 py-16 md:py-20">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground">
              Select a programming language to begin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = sectionIcons[section.id] || Code2;
              const colorClass = sectionColors[section.id] || "from-gray-500/20 to-gray-400/20 border-gray-500/30 hover:border-gray-500/50";
              const topicCount = section.topics.length;
              const questionCount = section.topics.reduce((sum, topic) => sum + topic.questionCount, 0);

              return (
                <Link
                  key={section.id}
                  href={`/topics#${section.id}`}
                  className="block h-full group"
                >
                  <Card className={`h-full border-2 bg-gradient-to-br ${colorClass} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span className="px-2 py-1 bg-background/50 rounded-full">
                            {topicCount} topics
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <CardTitle className="text-2xl mb-2">{section.title}</CardTitle>
                        <CardDescription className="text-base">
                          {section.description}
                        </CardDescription>
                      </div>
                      <div className="pt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{questionCount} questions</span>
                        <span>•</span>
                        <span className="group-hover:text-primary transition-colors">
                          Start learning →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
