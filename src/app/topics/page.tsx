import { getSections } from "@/lib/content";
import TopicsClient from "./topics-client";

export default function TopicsPage() {
  const sections = getSections().filter(section => 
    section.id !== 'java' && section.id !== 'cpp'
  );

  return <TopicsClient sections={sections} />;
}
