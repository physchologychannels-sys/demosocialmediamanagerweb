import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Alex Morgan — Social Media Manager & Creative Strategist" },
    { name: "description", content: "Explore Alex Morgan's fictional social media portfolio. Creative campaigns, thoughtful strategy, and content with personality." },
    { property: "og:title", content: "Alex Morgan — Social Media Manager & Creative Strategist" },
    { property: "og:description", content: "Good stories. Great social. A 3D demo portfolio of social strategy, content, and community." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Portfolio,
});
