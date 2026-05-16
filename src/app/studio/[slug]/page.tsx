"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setPage } from "@/lib/store/slices/draftPageSlice";
import { Page } from "@/lib/schema";
import { Toolbar } from "@/components/studio/Toolbar";
import { Sidebar } from "@/components/studio/Sidebar";
import { Canvas } from "@/components/studio/Canvas";

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

export default function StudioPage() {
  const params = useParams() as { slug: string };
  const slug = params.slug;
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // In a real app, we'd fetch from Contentful here
    // const page = await getPageBySlug(slug, true);
    const mockPage = getMockPage(slug);
    dispatch(setPage(mockPage as Page));
  }, [slug, dispatch]);

  if (role === "viewer") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-800">Access Denied</h1>
        <p className="text-slate-500">
          Viewers do not have access to the Studio.
        </p>
        <button
          onClick={() => (window.location.href = `/preview/${slug}`)}
          className="mt-4 text-indigo-600 hover:underline">
          Go to Preview
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Canvas />
        <Sidebar />
      </div>
    </div>
  );
}
