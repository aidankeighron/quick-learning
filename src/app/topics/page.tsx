import { getSections } from "@/lib/content";
import TopicsClient from "./topics-client";

export default function TopicsPage() {
  const sections = getSections();

  return <TopicsClient sections={sections} />;
}
