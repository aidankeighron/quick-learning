import { getSections } from "@/lib/content";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  const sections = getSections();

  return (
    <main className="min-h-screen bg-background p-8 md:p-24 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Quick Learning Practice
          </h1>
          <p className="text-xl text-muted-foreground">
            Master programming concepts efficiently.
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
                <p className="text-muted-foreground">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/quiz/${section.id}/${topic.id}`}
                    className="block h-full"
                  >
                    <Card className="h-full hover:bg-accent/10 hover:border-accent transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
