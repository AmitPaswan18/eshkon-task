import React from "react";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Page } from "@/lib/schema";

// Mock data generator for when Contentful is not connected
const getMockPage = (slug: string) => ({
  pageId: "mock-1",
  slug,
  title: "Sample Landing Page",
  sections: [
    {
      id: "sec-1",
      type: "hero",
      props: {
        title: "Build Faster with Page Studio",
        subtitle:
          "A powerful, schema-driven editor for high-performance landing pages.",
        ctaLabel: "Get Started",
        ctaUrl: "#",
        textColor: "#ffffff",
        backgroundColor: "#4f46e5",
      },
    },
    {
      id: "sec-2",
      type: "featureGrid",
      props: {
        title: "Powerful Features",
        features: [
          {
            title: "Schema Driven",
            description: "Everything is validated with Zod for total safety.",
          },
          {
            title: "Redux State",
            description: "Undo, redo, and state persistence out of the box.",
          },
          {
            title: "A11y First",
            description: "WCAG 2.2 AAA standards implemented by default.",
          },
        ],
        textColor: "#000000",
        backgroundColor: "#ffffff",
      },
    },
  ],
});

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export default async function PreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;
  const isPreview = sParams.preview === "true";

  // In a real app:
  // const page = await getPageBySlug(slug, isPreview);
  const page = getMockPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-black">
      <SectionRenderer sections={page.sections as Page["sections"]} />

      {isPreview && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end">
          <Link
            href={`/studio/${slug}`}
            className="bg-white dark:bg-slate-900 text-indigo-600 border border-indigo-200 dark:border-indigo-800 px-4 py-2 rounded-full shadow-lg font-medium text-sm hover:bg-indigo-50 transition-colors">
            ← Back to Studio
          </Link>
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg font-medium text-sm animate-pulse">
            Preview Mode
          </div>
        </div>
      )}
    </main>
  );
}
